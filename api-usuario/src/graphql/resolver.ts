import { MutationAuth } from './resolvers/auth.resolver';


export const resolvers = {
  Query: {
    // ...QueryAuth
    getUser: () => { return 'hola' },
  },
  Mutation: {
    ...MutationAuth
  }
};