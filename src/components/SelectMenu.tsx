import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

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
  const [open, setOpen] = useState(false);
  const options = [
    { value: "Roboto, sans-serif", label: "Sans-serif" },
    { value: "Roboto Serif, serif", label: "Serif" },
    { value: "Roboto Mono, monospace", label: "Monospace" },
  ];
  return (
    <div>
      <div className="z-20 relative">
        {/* <select
          className="bg-gray-200 p-2 pr-8 appearance-none"
          onClick={() => setOpen((prev) => !prev)}
          onChange={(e) => {
            setFont(e.target.value);
          }}
        >
          <option value="Roboto, sans-serif">Sans-Serif</option>
          <option value="Roboto Serif, serif">Serif</option>
          <option value="Roboto Mono, monospace">Monospace</option>
        </select> */}
        <div className="relative cursor-pointer">
          <div
            className="relative space-x-4 bg-white"
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="pr-4">{font.label}</div>
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
            className={`${
              open ? "" : "scale-y-0"
            } absolute bg-white origin-top transition-transform space-y-4 p-4 pl-2 -left-2 shadow-lg text-left w-max`}
          >
            {options.map((option) => (
              <div onClick={() => setFont(option)}>{option.label}</div>
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
