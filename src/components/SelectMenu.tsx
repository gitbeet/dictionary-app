import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useDarkMode } from "../context/darkModeContext";

const SelectMenu = ({
  setFont,
  font,
}: {
  setFont: React.Dispatch<
    React.SetStateAction<{
      value: string;
      label: string;
    }>
  >;
  font: { value: string; label: string };
}) => {
  const { darkMode } = useDarkMode();
  const [open, setOpen] = useState(false);
  const options = [
    { value: "Roboto, sans-serif", label: "Sans-serif" },
    { value: "Roboto Serif, serif", label: "Serif" },
    { value: "Roboto Mono, monospace", label: "Monospace" },
  ];
  return (
    <div>
      <div className="z-20 relative">
        <div className="relative cursor-pointer">
          <div
            className={`${
              darkMode ? "text-gray-400" : "text-gray-800"
            } relative space-x-4 `}
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="pr-4 font-bold">{font.label}</div>
            <div className="absolute left-full top-1/2 -translate-y-1/2 -translate-x-full">
              <FaChevronDown
                className={`${
                  open ? "-rotate-180" : ""
                } transition-all duration-200`}
              />
            </div>
          </div>

          <div
            onClick={() => setOpen(false)}
            className={`${open ? "" : "scale-y-0"} ${
              darkMode ? "bg-gray-900" : ""
            } absolute bg-white origin-top transition-transform space-y-4 p-4 pl-2 -left-2 shadow-lg text-left w-max`}
          >
            {options.map((option) => (
              <div
                className="font-semibold text-md"
                onClick={() => setFont(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      {open ? (
        <div
          onClick={() => setOpen(false)}
          className="top-0 bottom-0 left-0 right-0 fixed z-10"
        ></div>
      ) : null}
    </div>
  );
};

export default SelectMenu;
