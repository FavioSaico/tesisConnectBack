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
    id_universidad: Int!
    especialidades: [especialidadInput]
    publicaciones: [pulicacionInput]
  }
`

const typesEntitys = `
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
  type Universidad {
    id: String!
    nombre: String!
  }
  type User {
    id: String!
    nombres: String!
    apellidos: String!
    correo: String!
    descripcion: String!
    rol_tesista: Boolean
    rol_asesor: Boolean
    orcid: String!
    linea_investigacion: String!
    universidad: Universidad
    grado_academico: GradoAcademico
    carrera_profesional: CarreraProfesional
    especialidades: [Especialidad]
    publicaciones: [Pulicacion]
  }
  type AuthResponse {
    token: String!
    usuario: User
  }
`

export const typeDefsAuth = gql`
  ${typesEntitys}
  ${inputTypeAuth}
  type Query {
    getUser(id: Int!): User
    getUsers(ids: [Int]!): [User]
  }
  type Mutation {
    login(loginDto: loginInput!): AuthResponse
    register(registerDto: registerInput!): AuthResponse
  }
`;
