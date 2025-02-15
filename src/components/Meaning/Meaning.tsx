import { DefinitionInterface, MeaningInterface } from "../../models";

interface Props {
  meaning: MeaningInterface;
  searchWord: (e: any, term: string) => Promise<void>;
}

const Meaning = ({ meaning, searchWord }: Props) => {
  const { partOfSpeech, definitions, synonyms } = meaning;
  return (
    <article
      data-testid="meaning__container"
      className="flex flex-col items-start space-y-8 pb-12 border-b 
       dark:border-slate-800 border-slate-300"
    >
      <h2
        data-testid={"meaning__part-of-speech"}
        className="dark:text-slate-200 text-slate-800 text-lg font-semibold"
      >
        {partOfSpeech}
      </h2>
      <div className="text-left space-y-4">
        <h2
          data-testid="meaning__list-header"
          className="dark:text-slate-300 text-slate-500 text-lg"
        >
          Meaning
        </h2>
        <ul className="list-disc space-y-4 ">
          {definitions.map((definition: DefinitionInterface, index: number) => (
            <li
              data-testid="meaning__list-item"
              key={index}
              className="dark:text-slate-500 text-slate-600 marker:text-purple-800 pl-4"
            >
              {definition.definition}
            </li>
          ))}
        </ul>
        {synonyms.length > 0 && (
          <div className="flex space-x-4">
            <h3
              data-testid="meaning__synonyms-header"
              className="text-slate-600"
            >
              Synonyms
            </h3>
            <div className=" font-semibold tex-lg space-x-4">
              {synonyms.map((synonym: string, index: number) => (
                <span
                  data-testid="meaning__synonym-item"
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
    </article>
  );
};

export default Meaning;
