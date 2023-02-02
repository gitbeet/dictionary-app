import { useDarkMode } from "../context/darkModeContext";
import { DefinitionInterface, MeaningInterface } from "../models";

interface Props {
  meaning: MeaningInterface;
  searchWord: (e: any, term: string) => Promise<void>;
}

const MeaningSection = ({ meaning, searchWord }: Props) => {
  const { darkMode } = useDarkMode();
  const { partOfSpeech, definitions, synonyms } = meaning;
  return (
    <div
      className={`flex flex-col items-start space-y-8 pb-12 border-b ${
        darkMode ? "border-gray-800" : "border-gray-300"
      }`}
    >
      <h2
        className={` ${
          darkMode ? "text-gray-200" : "text-gray-800"
        } text-lg font-semibold `}
      >
        {partOfSpeech}
      </h2>
      <div className="text-left space-y-4">
        <h2
          className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-lg `}
        >
          Meaning
        </h2>
        <ul className=" list-disc space-y-4 ">
          {definitions.map((definition: DefinitionInterface, index: number) => (
            <li
              key={index}
              className={`  ${
                darkMode ? "text-gray-500" : "text-gray-600"
              }  marker:text-purple-800 pl-4`}
            >
              {definition.definition}
            </li>
          ))}
        </ul>
        {synonyms.length > 0 && (
          <div className="flex space-x-4">
            <h3 className="text-gray-600">Synonyms</h3>
            <div className=" font-semibold tex-lg space-x-4">
              {synonyms.map((synonym: string, index: number) => (
                <span
                  key={index}
                  className="cursor-pointer text-purple-600 hover:text-purple-500 transition-color duration-150"
                  onClick={(e) => searchWord(e, synonym)}
                >
                  {synonym}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeaningSection;
