import { useDarkMode } from "../../context/darkModeContext";
import { BsSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
const DarkMode = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      role="switch"
      aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
      onClick={toggleDarkMode}
      className="dark:bg-purple-600 bg-slate-300 relative px-[2px] rounded-full w-[44px] h-6 transition-all"
    >
      <div className="absolute top-1/2 -translate-y-1/2 dark:translate-x-0 dark:text-purple-600 translate-x-full text-slate-600 p-[3px] flex items-center justify-center rounded-full h-[20px] w-[20px] bg-white transition-all duration-300">
        {darkMode ? <FaMoon /> : <BsSunFill />}
      </div>
    </button>
  );
};

export default DarkMode;
