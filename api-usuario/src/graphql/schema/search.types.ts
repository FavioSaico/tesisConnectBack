import { gql } from "apollo-server";

const queryAndMutations = `
  type Query {
    getUsersSearch(term: String): [User]
  }
`

export const typeDefsSearch = gql`
  ${queryAndMutations}
`;