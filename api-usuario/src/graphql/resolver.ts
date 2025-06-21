import { MutationAuth, QueryAuth } from './resolvers/auth.resolver';
import { QueryGeneral } from './resolvers/general.resolver';
import { QueryOrcid } from './resolvers/orcid.resolver';

export const resolvers = {
  Query: {
    ...QueryAuth,
    ...QueryGeneral,
    ...QueryOrcid
  },
  Mutation: {
    ...MutationAuth
  }
};