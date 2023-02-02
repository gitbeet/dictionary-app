import { useState } from "react";
import "./App.css";
import WordSection from "./components/WordSection";
import { FiBookOpen } from "react-icons/fi";
import SearchBar from "./components/SearchBar";
import DarkMode from "./components/DarkMode";
import SelectMenu from "./components/SelectMenu";
import { useDarkMode } from "./context/darkModeContext";
import { WordDataInterface } from "./models";

function App() {
  const { darkMode } = useDarkMode();
  const [wordData, setWordData] = useState<WordDataInterface[] | null>(null);
  const [message, setMessage] = useState<string>("Please enter a word");
  const [font, setFont] = useState({
    value: "Roboto, sans-serif",
    label: "Sans-serif",
  });

  const searchWord = async (e: any, term: string) => {
    e.preventDefault();
    try {
      const jsonRes = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${term}`
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

  const body = document.body;
  body.style.backgroundColor = darkMode ? "#0e0e0f" : "white";

  return (
    <div
      style={{ fontFamily: font.value }}
      className={`
      ${darkMode ? "text-gray-200" : "text-gray-900"} 
      w-full space-y-12`}
    >
      <header className="flex justify-between items-center">
        <FiBookOpen
          className={`${
            darkMode ? "text-purple-600" : "text-gray-800"
          } w-8 h-8`}
        />
        <div className="flex space-x-8">
          <SelectMenu setFont={setFont} font={font} />
          <DarkMode />
        </div>
      </header>
      <SearchBar searchWord={searchWord} />
      {!wordData?.length ? (
        <h1>{message}</h1>
      ) : (
        <WordSection wordData={wordData} searchWord={searchWord} />
      )}
    </div>
  );
}

export default App;
