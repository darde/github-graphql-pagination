export type RepositoryType = {
  id: string
  name: string
  url: string
  stargazerCount: number
  forkCount: number
}

export type PaginationProps = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
}