// import { ApolloServer } from 'apollo-server';
import { ApolloServer } from '@apollo/server';
import { ExpressContextFunctionArgument, expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import { expressMiddleware } from 'apollo-server/express4';
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
import { metrics, trace, SpanStatusCode } from "@opentelemetry/api";
import { startOTel } from '../otel';


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
    const fibonacciInvocations = meter.createCounter("especialidad.invocations", {
      description: "Número de invocaciones de especialidades",
    });

    function fibonacci(n: number) {
      return tracer.startActiveSpan("especialidad", (span) => {
        span.setAttribute("especialidad.n", n);

        try {

          if (n < 1 || n > 90 || isNaN(n)) {
            throw new RangeError("n must be between 1 and 90");
          }

          var result = 1;
          if (n > 2) {
              var a = 0;
              var b = 1;

              for (var i = 1; i < n; i++) {
                  result = a + b;
                  a = b;
                  b = result;
              }
          }

          span.setAttribute("especialidad.result", result);
          fibonacciInvocations.add(1, { "especialidad.valid.n": true });
          return result;
        } catch (ex) {
          span.setStatus({ code: SpanStatusCode.ERROR, message: ex.message });
          span.recordException(ex);
          fibonacciInvocations.add(1, { "especialidad.valid.n": false });
          throw ex;
        } finally {
          span.end();
        }
      });
    };

    this.app.use(
      '/graphql',
      expressMiddleware(server,{
        context: async ({ req, res }: ExpressContextFunctionArgument): Promise<GraphQLContext>  => {

          fibonacci(23);

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