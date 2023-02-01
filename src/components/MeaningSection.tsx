interface Props {
  meaning: any;
  searchWord: (e: any, term: string) => Promise<void>;
}

const MeaningSection = ({ meaning, searchWord }: Props) => {
  const { partOfSpeech, definitions, synonyms } = meaning;
  return (
    <div className="flex flex-col items-start space-y-8 pb-12 border-b border-gray-300">
      <h2 className="text-lg font-semibold text-gray-800">{partOfSpeech}</h2>
      <div className="text-left space-y-4">
        <h2 className=" text-lg text-gray-500">Meaning</h2>
        <ul className=" list-disc space-y-4 ">
          {definitions.map((definition: any, index: number) => (
            <li
              key={index}
              className="text-gray-600 marker:text-purple-800 pl-4"
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
