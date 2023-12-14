import { ApolloClient, InMemoryCache } from '@apollo/client'


export const client = new ApolloClient({
  uri: import.meta.env['VITE_BACKEND_ENDPOINT'],
  cache: new InMemoryCache()
})