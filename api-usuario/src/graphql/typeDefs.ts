import { gql } from 'apollo-server';
import { typeDefsAuth, typeDefsGeneral, typeDefsOrcid } from './schema';

export const typeDefs = gql`
  ${typeDefsAuth}
  ${typeDefsGeneral}
  ${typeDefsOrcid}
`;