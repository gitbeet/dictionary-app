import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDarkMode } from "../context/darkModeContext";

interface Props {
  searchWord: (e: any, term: string) => Promise<void>;
}

const SearchBar = ({ searchWord }: Props) => {
  const { darkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <form
      onSubmit={(e) => searchWord(e, searchTerm)}
      className="relative"
    >
      <input
        placeholder="apple, human, car..."
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        className={`${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-200 text-gray-800"
        }  text-lg rounded-2xl w-full h-12 px-6 font-semibold`}
      />
      <button
        type="submit"
        className="absolute right-3 rounded-lg p-1 w-8 h-8 top-1/2 -translate-y-1/2"
      >
        <FiSearch className="w-full h-full text-purple-600" />
      </button>
    </form>
  );
};

export default SearchBar;
