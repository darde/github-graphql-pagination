import { gql, useQuery } from '@apollo/client'
import './App.css'
import TableList from './components/TableList'
import { useEffect, useState } from 'react'
import { RepositoriesType } from './types'

const GET_REACT_REPOSITORIES = gql`
  query {
    search (query:"topic:react sort:updated-asc", type: REPOSITORY, first: 20) {
      pageInfo {hasNextPage, endCursor}
      repositoryCount
      nodes {
        ... on Repository {
          id
          name
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

type ResponseType = RepositoriesType & {
  primaryLanguage: {
    name: string
  }
}



function App() {
  const { data, loading, error } = useQuery<{ search: { nodes: ResponseType[] } }>(GET_REACT_REPOSITORIES)
  const [repositories, setRepositories] = useState<RepositoriesType[]>([])
  
  useEffect(() => {
    if (!loading && !error) {
      const repos: RepositoriesType[] = data!.search.nodes
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          stargazerCount: repo.stargazerCount,
          forkCount: repo.forkCount,
        }))
      setRepositories(repos)
    }
  }, [data, loading, error])

  if (error) {
    return <p>Error {error.message}</p>
  }

  console.log({ data })

  return (
    <div>
      <h1>Popular Repositories</h1>
      {
        loading ? (
          <p>Loading...</p>
        ) : (
          <TableList repositoriesList={repositories} />
        )
      }
    </div>
  )
}

export default App
