import { createContext, PropsWithChildren, useContext, useState } from "react";

interface AppContextInterface {
  darkMode: boolean;
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
  const [darkMode, setDarkMode] = useState(prefersDark);

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
