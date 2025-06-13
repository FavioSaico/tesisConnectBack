import { gql } from 'apollo-server';

const typesEntitys = `
  type EspecialidadGeneral {
    id: String!
    nombre: String!
  }
  type GradoAcademicoGeneral {
    id: String!
    nombre: String!
  }
  type CarreraProfesionalGeneral {
    id: String!
    nombre: String!
  }
  type UniversidadGeneral {
    id: String!
    nombre: String!
  }
`

export const typeDefsGeneral = gql`
  ${typesEntitys}
  type Query {
    getEspecialidades: [EspecialidadGeneral]
    getGradosAcademicos: [GradoAcademicoGeneral]
    getUniversidades: [UniversidadGeneral]
    getCarrerasProfesionales: [CarreraProfesionalGeneral]
  }
`;
