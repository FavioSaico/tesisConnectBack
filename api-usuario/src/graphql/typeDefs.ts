import { gql } from 'apollo-server';
import { typeDefsAuth } from './schema';

export const typeDefs = gql`
  ${typeDefsAuth}
`;