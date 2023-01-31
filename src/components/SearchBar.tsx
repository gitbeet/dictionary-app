import { FiSearch } from "react-icons/fi";

interface Props {
  searchWord: (e: any) => Promise<void>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchWord, setSearchTerm }: Props) => {
  return (
    <form onSubmit={searchWord} className="relative">
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
