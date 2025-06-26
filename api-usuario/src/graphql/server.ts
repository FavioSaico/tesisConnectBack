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
      origin: '*',
      credentials: true
    }));

    this.app.use(express.json());

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
      // context: (): GraphQLContext => ({
      //   authRepository,
      //   generalRepository,
      //   orcidRepository
      // }),
      // cors: {
      //       origin: '*',
      //       credentials: true
      //   }
    });

    
    this.app.use(this.routes)
    
    await server.start();


    this.app.use(
      '/graphql',
      expressMiddleware(server,{
        context: async ({ }: ExpressContextFunctionArgument): Promise<GraphQLContext>  => {
          return {
            authRepository,
            generalRepository,
            orcidRepository
          };
        }
      })
    );

    /*
    , {
        context: async ({ req: Request, res: Response }: ExpressContextFunctionArgument): Promise<GraphQLContext>  => {
          return {
            authRepository,
            generalRepository,
            orcidRepository
          };
        }
      }
    */

    // server.applyMiddleware({
    //   this.app,
    //   path: '/graphql',
    //   cors: {
    //     origin: '*', // frontend
    //     credentials: true
    //   }
    // });

    // this.app.use('/graphql', expressMiddleware(server, {
    //   context: async ({ req }) => {
    //     const token = req.cookies['accessToken'];
    //     if (!token) return { user: null };

    //     try {
    //       const payload = jwt.verify(token, process.env.ACCESS_SECRET!);
    //       return { user: payload };
    //     } catch (err) {
    //       return { user: null };
    //     }
    //   }
    // }));
    // this.app.post('/login', async (req, res) => {
    //   const { email, password } = req.body;

    //   // Validación de usuario omitida
    //   const userId = "123";
    //   const token = jwt.sign({ id: userId, email }, process.env.ACCESS_SECRET!, { expiresIn: '15m' });

    //   res.cookie('accessToken', token, {
    //     httpOnly: true,
    //     secure: false,
    //     sameSite: 'lax',
    //     maxAge: 15 * 60 * 1000
    //   });

    //   res.send({ ok: true });
    // });

    this.app.listen(this.port, () => {
      console.log('GraphQL API on http://localhost:4000/graphql');
    });

    // this.app.listen({ port: this.port }).then(({ url }) => {
    //   console.log(`Apolo Server listo en ${url}`);
    // });
  }
}