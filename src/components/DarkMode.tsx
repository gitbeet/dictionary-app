import { useDarkMode } from "../context/darkModeContext";
import { BsSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import "../css/DarkMode.css";
const DarkMode = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <div
      onClick={toggleDarkMode}
      className={`${
        darkMode ? "bg-purple-600" : "bg-gray-500"
      } relative px-[2px]  rounded-full w-[44px] h-6 transition-all`}
    >
      {/* TODO regular css for animation */}
      <div
        className={`absolute top-1/2 -translate-y-1/2  ${
          darkMode
            ? "translate-x-0 text-purple-600"
            : "translate-x-full text-gray-600"
        } p-[3px] flex items-center justify-center rounded-full h-[20px] w-[20px] bg-white  transition-all duration-300 `}
      >
        {darkMode ? <FaMoon /> : <BsSunFill />}
      </div>
    </div>
  );
};

export default DarkMode;
