import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolver';
import { typeDefs } from './typeDefs';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../infrastructure';
import { GraphQLContext } from './types/context';

interface Options{
    port?: number;
}

export class ServerGraphQL {

  private app: ApolloServer;
  private readonly port: number;

  constructor(options:Options){
    const {port = 3100 } = options;
    this.port = port;
  }

  async start() {

    const authDatasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(authDatasource);

    this.app = new ApolloServer({
      typeDefs,
      resolvers,
      context: (): GraphQLContext => ({
        authRepository
      }),
      cors: {
            origin: '*',
            credentials: true
        }
    });

    this.app.listen({ port: this.port }).then(({ url }) => {
      console.log(`Apolo Server listo en ${url}`);
    });
  }
}