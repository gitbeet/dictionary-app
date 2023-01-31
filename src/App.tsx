import { useState } from "react";
import "./App.css";
import WordSection from "./components/WordSection";
import { FiBookOpen } from "react-icons/fi";
import SearchBar from "./components/SearchBar";
import DarkMode from "./components/DarkMode";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [wordData, setWordData] = useState<any>([]);
  const [message, setMessage] = useState<string>("Please enter a word");

  const searchWord = async (e: any) => {
    e.preventDefault();
    try {
      const jsonRes = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
      );
      const res = await jsonRes.json();
      setWordData(res);
      console.log(res);
      setMessage(res.title);
    } catch (error: any) {
      console.log(error);
      setMessage(error);
    }
  };

  return (
    <div className="w-full space-y-8">
      <header className="flex justify-between items-center">
        <FiBookOpen className="w-8 h-8" />
        <div className="flex space-x-4">
          <select>
            <option>Serif</option>
            <option>Sans-Serif</option>
            <option>Monospace</option>
          </select>
          <DarkMode />
        </div>
      </header>
      <SearchBar searchWord={searchWord} setSearchTerm={setSearchTerm} />
      {!wordData.length ? (
        <h1>{message}</h1>
      ) : (
        <WordSection wordData={wordData} />
      )}
    </div>
  );
}

export default App;
