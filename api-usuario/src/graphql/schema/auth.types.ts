import { gql } from 'apollo-server';

const inputTypeAuth = `
  input loginInput {
    correo: String!
    contrasena: String!
  }
  input especialidadInput {
    idEspecialidad: Int!
    aniosExperiencia: Int!
  }
  input pulicacionInput {
    titulo: String!
    baseDatosBibliografica: String!
    revista: String!
    anioPublicacion: Int!
    urlPublicacion: String!
  }
  input registerInput {
    correo: String!
    contrasena: String!
    nombres: String!
    apellidos: String!
    descripcion: String!
    rol_tesista: Boolean
    rol_asesor: Boolean
    orcid: String!
    linea_investigacion: String!
    id_grado_academico: Int!
    id_carrera_profesional: Int!
    especialidades: [especialidadInput]
    publicaciones: [pulicacionInput]
  }
`

export const typeDefsAuth = gql`
  type Especialidad {
    idEspecialidad: Int!
    nombreEspecialidad: String!
    aniosExperiencia: Int!
  }
  type Pulicacion {
    titulo: String!
    baseDatosBibliografica: String!
    revista: String!
    anioPublicacion: Int!
    urlPublicacion: String!
  }
  type GradoAcademico {
    id: String!
    nombre: String!
  }
  type CarreraProfesional {
    id: String!
    nombre: String!
  }
  type User {
    nombres: String!
    apellidos: String!
    correo: String!
    descripcion: String!
    rol_tesista: Boolean
    rol_asesor: Boolean
    orcid: String!
    linea_investigacion: String!
    especialidades: [Especialidad]
    publicaciones: [Pulicacion]
    grado_academico: GradoAcademico
    carrera_profesional: CarreraProfesional
  }

  type AuthResponse {
    token: String!
    usuario: User
  }
  type Query {
    getUser: String
  }
  type Mutation {
    login(loginDto: loginInput!): AuthResponse
    register(registerDto: registerInput!): AuthResponse
  }

  ${inputTypeAuth}
`;

/*

  type Mutation {
    createUser(name: String!, email: String!): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

*/