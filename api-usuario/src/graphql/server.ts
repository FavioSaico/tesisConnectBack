// import { ApolloServer } from 'apollo-server';
import { ApolloServer } from '@apollo/server';
import { ExpressContextFunctionArgument, expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { resolvers } from './resolver';
import { typeDefs } from './typeDefs';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../infrastructure';
import { GraphQLContext } from './types/context';
import { GeneralRepositoryImpl } from '../infrastructure/repositories/general.repository.impl';
import { GeneralDatasourceImpl } from '../infrastructure/datasources/general.datasource.impl';
import { OrcidDatasourceImpl } from '../infrastructure/datasources/orcid-api.datasource';
import { OrcidRepositoryImpl } from '../infrastructure/repositories/orcid.repository';
import express, { Router, Request, Response } from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import http from 'http';
import { metrics, trace } from "@opentelemetry/api";
import { startOTel } from '../otel';
import { DocumentNode, OperationDefinitionNode, parse } from 'graphql';


interface Options{
  port?: number;
  routes: Router;
}

export class ServerGraphQL {

  // private app: ApolloServer;
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options:Options){
    const {port = 3100, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {

    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended:true}));
    this.app.use(cors({
      origin: ['http://localhost:5173', 'https://tesis-connect.netlify.app'], // http://localhost:5173/
      credentials: true
    }));

    // this.app.use(express.json());

    const httpServer = http.createServer(this.app);
    const authDatasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(authDatasource);

    const generalDatasource = new GeneralDatasourceImpl();
    const generalRepository = new GeneralRepositoryImpl(generalDatasource);

    const orcidDatasource = new OrcidDatasourceImpl();
    const orcidRepository = new OrcidRepositoryImpl(orcidDatasource);

    const server = new ApolloServer<GraphQLContext>({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    
    this.app.use(this.routes)
    
    await server.start();
    startOTel()

    const tracer = trace.getTracer("api-usuario");
    const meter = metrics.getMeter("api-usuario");

    const rssGauge = meter.createObservableGauge('process.memory.heap.rss', {
      description: 'Resident Set Size (RSS) Memory in MB',
    });

    const heapUsedGauge = meter.createObservableGauge('process.memory.heap.used', {
      description: 'Resident Set Size (RSS) Memory in MB',
    });

    rssGauge.addCallback((observableResult) => {
      const mem = process.memoryUsage();
      observableResult.observe(mem.rss / 1024 / 1024);
    });

    heapUsedGauge.addCallback((observableResult) => {
      const mem = process.memoryUsage();
      observableResult.observe(mem.heapUsed / 1024 / 1024);
    });


    this.app.use('/graphql', async (req, res, next) => {
      if (req.method === 'POST') {
        const { query, operationName } = req.body;

        let operationType = 'unknown';
        try {
          const doc: DocumentNode = parse(query);
          for (const def of doc.definitions) {
            if (def.kind === 'OperationDefinition') {
              operationType = (def as OperationDefinitionNode).operation;
              break;
            }
          }
        } catch (err) {
          console.error('Error parsing GraphQL query:', err);
        }

        const span = tracer.startSpan('graphql.request', {
          attributes: {
            'graphql.operation.name': operationName || 'Anonymous',
            'graphql.operation.type': operationType
          }
        });

        res.on('finish', () => {
          span.end();
        });
      }
      next();
    });

    this.app.use(
      '/graphql',
      expressMiddleware(server,{
        context: async ({ req, res }: ExpressContextFunctionArgument): Promise<GraphQLContext>  => {

          return {
            req,
            res,
            authRepository,
            generalRepository,
            orcidRepository
          };
        }
      })
    );

    this.app.listen(this.port, () => {
      console.log(`Apolo Server listo en ${this.port}`);
    });
  }
}