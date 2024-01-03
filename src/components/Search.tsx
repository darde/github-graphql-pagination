import { ChangeEvent, useState } from "react"

type SearchProps = {
  handleSearch: (term: string) => void
}
const Search = ({ handleSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("")

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="w-full h-20 bg-sky-200 rounded-xl p-4 mb-10 flex justify-center gap-10">
      <input
        type="search"
        value={searchTerm}
        onChange={handleOnChange}
        placeholder="Type a search term"
        className="w-10/12 max-w-[400px] rounded shadow-sm text-zinc-700 text-xl px-4"
      />
      <button
        className="bg-sky-700 text-white w-[80px] rounded shadow-sm text-2xl hover:bg-sky-500"
        onClick={() => handleSearch(searchTerm)}
      >
        Go
      </button>
    </div>
  )
}

export default Search
