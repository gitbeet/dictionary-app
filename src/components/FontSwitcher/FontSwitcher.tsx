import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FocusTrap } from "focus-trap-react";
import { options } from "../../utilities";

const FontSwitcher = ({
  setFont,
  font,
}: {
  setFont: React.Dispatch<
    React.SetStateAction<"sans" | "serif" | "mono" | null>
  >;
  font: "sans" | "serif" | "mono" | null;
}) => {
  const [open, setOpen] = useState(false);
  const currentFont = options.find((f) => f.type === font);

  return (
    <div>
      <FocusTrap
        active={open}
        focusTrapOptions={{
          escapeDeactivates: true,
          allowOutsideClick: true,
          onDeactivate: () => setOpen(false),
          tabbableOptions: {
            displayCheck: import.meta.env.TEST ? "none" : undefined,
          },
        }}
      >
        <div
          className={`relative cursor-pointer z-20 w-36 dark:text-slate-400 text-slate-800 dark:bg-slate-900  ${
            open ? "bg-white" : "bg-slate-200"
          } rounded`}
        >
          <button
            aria-label="Select font"
            className="gap-3 p-2 flex items-center w-full justify-between focus:bg-slate-200 dark:focus:bg-slate-800"
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="font-bold shrink-0">{currentFont?.label}</div>
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
            }  absolute top-full dark:bg-slate-900 bg-white origin-top transition-transform shadow-lg text-left w-full rounded-b-sm`}
          >
            {options
              .filter((o) => o.type !== font)
              .map((option) => (
                <button
                  key={option.value}
                  aria-label={`Switch font to ${option.label.toLowerCase()}`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setFont(option.type)}
                  className="font-semibold w-full text-left block text-md hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-800 dark:focus:bg-slate-800 transition-colors py-2 pr-4 pl-2"
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
          className="top-0 bottom-0 left-0 right-0 fixed z-10 backdrop-blur bg-black/10"
        ></div>
      ) : null}
    </div>
  );
};

export default FontSwitcher;
