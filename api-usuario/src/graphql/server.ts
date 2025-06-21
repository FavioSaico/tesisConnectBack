import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolver';
import { typeDefs } from './typeDefs';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../infrastructure';
import { GraphQLContext } from './types/context';
import { GeneralRepositoryImpl } from '../infrastructure/repositories/general.repository.impl';
import { GeneralDatasourceImpl } from '../infrastructure/datasources/general.datasource.impl';
import { OrcidDatasourceImpl } from '../infrastructure/datasources/orcid-api.datasource';
import { OrcidRepositoryImpl } from '../infrastructure/repositories/orcid.repository';

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

    const generalDatasource = new GeneralDatasourceImpl();
    const generalRepository = new GeneralRepositoryImpl(generalDatasource);

    const orcidDatasource = new OrcidDatasourceImpl();
    const orcidRepository = new OrcidRepositoryImpl(orcidDatasource);

    this.app = new ApolloServer({
      typeDefs,
      resolvers,
      context: (): GraphQLContext => ({
        authRepository,
        generalRepository,
        orcidRepository
      }),
      // cors: {
      //       origin: '*',
      //       credentials: true
      //   }
    });

    this.app.listen({ port: this.port }).then(({ url }) => {
      console.log(`Apolo Server listo en ${url}`);
    });
  }
}