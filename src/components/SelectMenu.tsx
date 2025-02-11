import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FocusTrap } from "focus-trap-react";

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
      <FocusTrap
        active={open}
        focusTrapOptions={{
          escapeDeactivates: true,
          allowOutsideClick: true,
          onDeactivate: () => setOpen(false),
        }}
      >
        <div className="relative cursor-pointer z-20 w-36 dark:text-gray-400 text-gray-800 dark:bg-gray-900  bg-white">
          <button
            aria-label="Select font"
            className="gap-3 p-2 flex items-center w-full justify-between"
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="font-bold shrink-0">{font.label}</div>
            <FaChevronDown
              className={`${
                open ? "-rotate-180" : ""
              } transition-all duration-200 shrink-0`}
            />
          </button>
          <div
            role="menu"
            onClick={() => setOpen(false)}
            className={`${
              open ? "" : "scale-y-0"
            }  absolute top-full dark:bg-gray-900 bg-white origin-top transition-transform shadow-lg text-left w-full rounded-b-sm`}
          >
            {options
              .filter((o) => o.value !== font.value)
              .map((option) => (
                <button
                  key={option.value}
                  aria-label={`Switch font to ${option.label.toLowerCase()}`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setFont(option)}
                  className="font-semibold w-full text-left block text-md hover:bg-gray-800 transition-colors py-2 pr-4 pl-2"
                >
                  {option.label}
                </button>
              ))}
          </div>
        </div>
      </FocusTrap>

      {open ? (
        <div
          onClick={() => setOpen(false)}
          className="top-0 bottom-0 left-0 right-0 fixed z-10 backdrop-blur bg-gray-950/10"
        ></div>
      ) : null}
    </div>
  );
};

export default SelectMenu;
