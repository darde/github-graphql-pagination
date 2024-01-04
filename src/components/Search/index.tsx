import { ChangeEvent, useState } from "react";

type SearchProps = {
  handleSearch: (term: string) => void;
};
const Search = ({ handleSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [warning, setWarning] = useState(false);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleOnClick() {
    if (!searchTerm) {
      setWarning(true);
      return;
    }
    setWarning(false);
    handleSearch(searchTerm);
  }

  return (
    <div className="w-full h-30 mb-10 flex flex-col justify-start gap-5">
      <div className="h-20 p-4 bg-sky-200 rounded-xl flex flex-row justify-center gap-10">
        <input
          type="search"
          value={searchTerm}
          onChange={handleOnChange}
          placeholder="Type a search term"
          className="w-10/12 max-w-[400px] rounded shadow-sm text-zinc-700 text-xl px-4"
        />
        <button
          className="bg-sky-700 text-white w-[80px] rounded shadow-sm text-2xl hover:bg-sky-500"
          onClick={handleOnClick}
        >
          Go
        </button>
      </div>
      {warning && <div>Please, type a valid term.</div>}
    </div>
  );
};

export default Search;
