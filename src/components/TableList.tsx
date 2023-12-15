import { RepositoryType } from "../types"
import { StarIcon, ForkIcon } from "./icons"

type RepositoriesListType = {
  repositoriesList: RepositoryType[]
}

function TableList({ repositoriesList }: RepositoriesListType) {

  return (
    <div className="shadow overflow-hidden rounded-xl border-b border-gray-200 w-full max-w-4xl">
      <table className="w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr className="text-left h-14 text-xl">
            <th className="p-4 w-2/3">Name</th>
            <th className="text-center">Stars</th>
            <th className="text-center">Forks</th>
          </tr>
        </thead>
        <tbody>
          {
            repositoriesList.map((repo, index) => (
              <tr key={repo.id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-left h-12`}>
                <td className="px-4 py-1 text-lg"><a href={repo.url} target="blank">{repo.name}</a></td>
                <td className="text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span>{repo.stargazerCount}</span>
                    <StarIcon />
                  </div>
                </td>
                <td className="text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span>{repo.forkCount}</span>
                    <ForkIcon />
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default TableList