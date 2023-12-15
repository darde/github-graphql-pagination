import { RepositoriesType } from "../types"

type RepositoriesListType = {
  repositoriesList: RepositoriesType[]
}

function TableList({ repositoriesList }: RepositoriesListType) {

  return (
    <table>
      <thead>
        <th>Name</th>
        <th>Stars</th>
        <th>Forks</th>
      </thead>
      <tbody>
        {
          repositoriesList.map(repo => (
            <tr key={repo.id}>
              <td>{repo.name}</td>
              <td>{repo.stargazerCount}</td>
              <td>{repo.forkCount}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default TableList