const MeaningSection = ({ meaning }: { meaning: any }) => {
  const { partOfSpeech, definitions, synonyms } = meaning;
  return (
    <div className="flex flex-col items-start space-y-8">
      <h2 className="text-lg font-semibold">{partOfSpeech}</h2>
      <div className="text-left space-y-2">
        <h2 className="text-gray-600">Meaning</h2>
        <div className="list-disc">
          {definitions.map((definition: any, index: number) => (
            <li key={index} className="">
              {definition.definition}
            </li>
          ))}
        </div>
        {synonyms.length > 0 && (
          <div className="flex space-x-4">
            <h3 className="text-gray-600">Synonyms</h3>
            <div className="text-purple-600 font-semibold tex-lg space-x-4">
              {synonyms.map((synonym: string, index: number) => (
                <span key={index}>{synonym}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeaningSection;
