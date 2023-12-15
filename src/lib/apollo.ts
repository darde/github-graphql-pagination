import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const httpLink = new HttpLink({
  uri: import.meta.env['VITE_GRAPHQL_ENDPOINT'], fetch, headers:{
    'Authorization': `Bearer ${import.meta.env['VITE_GITHUB_ACCESS_TOKEN']}`
  }
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})