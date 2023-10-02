import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from "react";

interface AppContextInterface {
  darkMode: boolean | undefined;
  toggleDarkMode: () => void;
}

const darkModeContext = createContext<AppContextInterface | null>(null);
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
export function useDarkMode() {
  const context = useContext(darkModeContext);
  if (!context) throw new Error("Dark mode context was not found");
  return context;
}

const DarkModeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const darkModeLs = localStorage.getItem("theme");
    const darkModeValue =
      darkModeLs === "dark" ? true : darkModeLs === "light" ? false : undefined;
    setDarkMode(darkModeValue ?? prefersDark);
  }, []);

  useEffect(() => {
    if (typeof darkMode === "undefined") return;
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  return (
    <darkModeContext.Provider value={{ toggleDarkMode, darkMode }}>
      {children}
    </darkModeContext.Provider>
  );
};

export default DarkModeProvider;
