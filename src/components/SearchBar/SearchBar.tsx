import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  searchWord: (e: any, term: string) => Promise<void>;
}

const SearchBar = ({ searchWord }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <form
      role="search"
      onSubmit={(e) => searchWord(e, searchTerm)}
      className="relative"
    >
      <label
        htmlFor="search-input"
        className="sr-only"
      >
        Search a word
      </label>
      <input
        id="search-input"
        placeholder="apple, human, car..."
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        className="dark:bg-slate-900 dark:text-slate-100 bg-slate-200 text-slate-800 text-lg rounded-2xl w-full h-12 px-6 font-semibold placeholder:text-slate-400 dark:placeholder:text-slate-600"
      />
      <button
        aria-label="Search"
        type="submit"
        className="absolute right-3 rounded-lg p-1 w-8 h-8 top-1/2 -translate-y-1/2"
      >
        <FiSearch className="w-full h-full text-purple-600" />
      </button>
    </form>
  );
};

export default SearchBar;
