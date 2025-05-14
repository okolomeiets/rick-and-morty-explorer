import { gql } from "graphql-request";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
        species
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
        name
        episode
        air_date
      }
    }
  }
`;
