import { gql, useQuery } from '@apollo/client'
import TableList from './components/TableList'
import { useEffect, useState } from 'react'
import { RepositoryType } from './types'
import { SpinnerIcon } from './components/icons'
import './styles/global.css'

const GET_REACT_REPOSITORIES = gql`
  query {
    search (query:"topic:react sort:updated-asc", type: REPOSITORY, first: 15) {
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

type ResponseType = RepositoryType & {
  primaryLanguage: {
    name: string
  }
}

function App() {
  const { data, loading, error } = useQuery<{ search: { nodes: ResponseType[] } }>(GET_REACT_REPOSITORIES)
  const [repositories, setRepositories] = useState<RepositoryType[]>([])
  
  useEffect(() => {
    if (!loading && !error) {
      const repos: RepositoryType[] = data!.search.nodes
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          stargazerCount: repo.stargazerCount,
          forkCount: repo.forkCount,
          url: repo.url
        }))
      setRepositories(repos)
    }
  }, [data, loading, error])

  if (error) {
    return <p>Error {error.message}</p>
  }

  return (
    <div className='bg-slate-50 w-full h-full pt-8'>
      <h1 className='text-3xl mb-8'>Popular Repositories</h1>
      <div className='flex justify-center'>
        {
          loading ? (
            <div className='flex flex-col justify-center items-center gap-4 mt-8'>
              <SpinnerIcon />
              <p className='text-xl'>Loading...</p>
            </div>
          ) : (
            <TableList repositoriesList={repositories} />
          )
        }
      </div>
    </div>
  )
}

export default App
