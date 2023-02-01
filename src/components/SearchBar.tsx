import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  searchWord: (e: any, term: string) => Promise<void>;
}

const SearchBar = ({ searchWord }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <form onSubmit={(e) => searchWord(e, searchTerm)} className="relative">
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        className=" bg-gray-100 text-lg rounded-2xl w-full h-12 p-4 font-semibold text-gray-800 focus:outline-none focus:border-2 focus:border-purple-600"
      />
      <button
        type="submit"
        className="absolute left-[90%]   top-1/2 -translate-y-1/2"
      >
        <FiSearch className="w-6 h-6 text-purple-600" />
      </button>
    </form>
  );
};

export default SearchBar;
