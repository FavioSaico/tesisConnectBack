import { gql } from 'apollo-server';

const typesEntitys = `
  type OrcidWork {
    titulo: String!
    doi: String!
    urlPublicacion: String!
    anioPublicacion: String!
    base_datos: String!
    journal: String
  }
  type OrcidUser {
    orcid: String!
    nombre: String!
    apellido: String!
    url_perfil: String!
    url_linkedin: String
    publicaciones: [OrcidWork]
  }
`

export const typeDefsOrcid = gql`
  ${typesEntitys}
  type Query {
    getUserByOrcid(id: String!): OrcidUser
  }
`;
