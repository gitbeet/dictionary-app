import { useEffect, useState } from "react";
import WordInfo from "./components/WordInfo/WordInfo";
import { FiBookOpen } from "react-icons/fi";
import SearchBar from "./components/SearchBar/SearchBar";
import DarkMode from "./components/DarkMode/DarkMode";
import FontSwitcher from "./components/FontSwitcher/FontSwitcher";
import { useDarkMode } from "./context/darkModeContext";
import { WordDataInterface } from "./models";
import { options } from "./utilities";
import LoadingSpinner from "./components/loading-spinner";

function App() {
  const { darkMode } = useDarkMode();
  const [wordData, setWordData] = useState<WordDataInterface[] | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setMessage("");
    setWordData(null);
    if (term.length < 1) {
      setMessage("Please enter a word");
      setLoading(false);
      return;
    }
    try {
      const jsonRes = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${term}`
      );
      const res = await jsonRes.json();
      setWordData(res);
      setMessage(res.title);
    } catch (error: any) {
      setMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const currentFont = options.find((f) => f.type === font)?.value;

  const body = document.body;
  body.style.backgroundColor = darkMode ? "#08090d" : "white";

  const header = (
    <header className="flex justify-between items-center">
      <FiBookOpen className="w-8 h-8 shrink-0 text-slate-800 dark:text-purple-600" />
      <div className="flex gap-6 sm:gap-12 items-center">
        <FontSwitcher
          setFont={setFont}
          font={font}
        />
        <DarkMode />
      </div>
    </header>
  );

  return (
    <div className={`${darkMode ? "dark" : ""} `}>
      <main
        style={{ fontFamily: currentFont }}
        className="mx-auto w-[95%] md:w-[90%] lg:w-[80%] space-y-12 p-4 md:p-8"
      >
        {header}
        <SearchBar searchWord={searchWord} />
        {loading && (
          <div className="grid place-content-center py-12">
            <LoadingSpinner />
          </div>
        )}
        <WordInfo
          message={message}
          wordData={wordData}
          searchWord={searchWord}
        />
      </main>
    </div>
  );
}

export default App;
