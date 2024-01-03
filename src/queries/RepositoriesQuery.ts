import { gql } from '@apollo/client'

export const GET_REACT_REPOSITORIES = gql`
  query GetRepositories ($first: Int, $last: Int, $after: String, $before: String, $querystring: String!) {
    search (
      query: $querystring,
      type: REPOSITORY,
      first: $first,
      last: $last,
      after: $after,
      before: $before
    ) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      repositoryCount
      nodes {
        ... on Repository {
          id
          name
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`