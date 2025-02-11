import { useEffect, useState } from "react";
import WordSection from "./components/WordSection";
import { FiBookOpen } from "react-icons/fi";
import SearchBar from "./components/SearchBar/SearchBar";
import DarkMode from "./components/DarkMode/DarkMode";
import SelectMenu from "./components/SelectMenu";
import { useDarkMode } from "./context/darkModeContext";
import { WordDataInterface } from "./models";
import { options } from "./utilities";

function App() {
  const { darkMode } = useDarkMode();
  const [wordData, setWordData] = useState<WordDataInterface[] | null>(null);
  const [message, setMessage] = useState<string>("");
  const [font, setFont] = useState<"serif" | "sans" | "mono" | null>(null);

  useEffect(() => {
    const localStorageFont = localStorage.getItem("font");
    if (!font) setFont("sans");
    const f = options.find((f) => f.type === localStorageFont);
    if (!f) return;
    setFont(f.type);
  }, []);

  useEffect(() => {
    if (!font) return;
    localStorage.setItem("font", font);
  }, [font]);

  const searchWord = async (e: any, term: string) => {
    e.preventDefault();
    setMessage("");
    setWordData(null);
    if (term.length < 1) {
      setMessage("Please enter a word");
      return;
    }
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

  const currentFont = options.find((f) => f.type === font)?.value;

  const body = document.body;
  body.style.backgroundColor = darkMode ? "#08090d" : "white";

  return (
    <div className={`${darkMode ? "dark" : ""} `}>
      <div
        style={{ fontFamily: currentFont }}
        className="mx-auto w-[95%] md:w-[90%] lg:w-[80%] space-y-12 p-4 md:p-8"
      >
        <header className="flex justify-between items-center">
          <FiBookOpen className="w-8 h-8 shrink-0 text-slate-800 dark:text-purple-600" />
          <div className="flex gap-6 sm:gap-12 items-center">
            <SelectMenu
              setFont={setFont}
              font={font}
            />
            <DarkMode />
          </div>
        </header>
        <SearchBar searchWord={searchWord} />
        {message && (
          <p
            className="text-center text-red-500 text-xl"
            id="message"
          >
            {message}
          </p>
        )}
        {wordData && !message && (
          <WordSection
            wordData={wordData}
            searchWord={searchWord}
          />
        )}
      </div>
    </div>
  );
}

export default App;
