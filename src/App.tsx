import { useQuery } from '@apollo/client'
import TableList from './components/TableList'
import { useEffect, useState } from 'react'
import { RepositoryType } from './types'
import { SpinnerIcon } from './components/icons'
import { GET_REACT_REPOSITORIES } from './queries/RepositoriesQuery'
import Pagination from './components/Pagination'
import './styles/global.css'


type ResponseType = RepositoryType & {
  primaryLanguage: {
    name: string
  }
}

type PaginationProps = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
}

type QueryProps = {
  search: {
    nodes: ResponseType[]
    pageInfo: PaginationProps & {
      startCursor: string
      endCursor: string
    },
  }
}

const ITEMS_PER_PAGE = 5

function App() {
  const [repositories, setRepositories] = useState<RepositoryType[]>([])
  const [pagination, setPagination] = useState<PaginationProps | null>(null)
  const [startCursor, setStartCursor] = useState<string | null>(null)
  const [endCursor, setEndCursor] = useState<string | null>(null)
  const [pageLoading, setPageLoading] = useState(false)

  const { data, loading, error, refetch } = useQuery<QueryProps>(GET_REACT_REPOSITORIES, {
    variables: { first: ITEMS_PER_PAGE, last: null, after: null, before: null }
  })
  
  useEffect(() => {
    setPageLoading(loading)
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
      setPagination({
        hasNextPage: data!.search.pageInfo.hasNextPage,
        hasPreviousPage: data!.search.pageInfo.hasPreviousPage,
        page: 1,
      })
      setStartCursor(data!.search.pageInfo.startCursor)
      setEndCursor(data!.search.pageInfo.endCursor)
      setPageLoading(loading)
    }
  }, [data, loading, error])

  if (error) {
    return <p>Error {error.message}</p>
  }

  async function handlePageClick(id: number) {
    console.log({ id })
    setPageLoading(true)
    let page = 1
    let refetchObject: { after: string | null, before: string | null, first: number | null, last: number | null } = { after: null, before: null, first: 5, last: null }

    if (id === 0) { // next page
      refetchObject = { first: ITEMS_PER_PAGE, last: null, after: endCursor, before: null }
      page = pagination!.page + 1
      
    } else if (id === -1) { // previous page
      refetchObject = { first: null, last: ITEMS_PER_PAGE, after: null, before: startCursor }
      page = pagination!.page - 1
    } else {
      const offsetStartCursor = `cursor:${ITEMS_PER_PAGE * (id - 1)}`
      const encodedStartCursor = btoa(String(offsetStartCursor))
      console.log({ encodedStartCursor })
      refetchObject = { first: ITEMS_PER_PAGE, last: null, after: encodedStartCursor, before: null }
      page = id
    }
    
    console.log({refetchObject})
    refetch({
      ...refetchObject
    }).then(res => {
      setPagination({
        hasNextPage: res.data!.search.pageInfo.hasNextPage,
        hasPreviousPage: res.data!.search.pageInfo.hasPreviousPage,
        page,
      })
      setStartCursor(res.data!.search.pageInfo.startCursor)
      setEndCursor(res.data!.search.pageInfo.endCursor)
    }).catch(err => console.log({err}))
    .finally(() => setPageLoading(false))
  }

  return (
    <div className='bg-slate-50 w-full h-full py-8'>
      <h1 className='text-3xl mb-8'>Popular Repositories</h1>
      <div className='flex justify-center'>
        {
          pageLoading ? (
            <div className='flex flex-col justify-center items-center gap-4 mt-8'>
              <SpinnerIcon />
              <p className='text-xl'>Loading...</p>
            </div>
          ) : (
            <div className='flex flex-col w-full items-center gap-4'>
              <TableList repositoriesList={repositories} />
              { pagination && (
                <Pagination
                  {...pagination}
                  handlePageClick={handlePageClick}
                />
              )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App
