import { gql } from 'apollo-server';
import { typeDefsAuth, typeDefsGeneral, typeDefsOrcid, typeDefsSearch } from './schema';

export const typeDefs = gql`
  ${typeDefsAuth}
  ${typeDefsGeneral}
  ${typeDefsOrcid}
  ${typeDefsSearch}
`;