import { useDarkMode } from "../context/darkModeContext";
import { CgSun } from "react-icons/cg";
import { BsMoon } from "react-icons/bs";
import "../css/DarkMode.css";
const DarkMode = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <div
      onClick={toggleDarkMode}
      className="relative px-[2px] bg-gray-500 rounded-full w-[44px] h-6 transition-all"
    >
      {/* TODO regular css for animation */}
      <div
        className={`absolute top-1/2 -translate-y-1/2  ${
          darkMode ? "translate-x-0" : "translate-x-full"
        } flex items-center justify-center rounded-full h-[20px] w-[20px] bg-white transition-all duration-300 `}
      >
        {darkMode ? <BsMoon /> : <CgSun />}
      </div>
    </div>
  );
};

export default DarkMode;
