import MeaningSection from "./MeaningSection";
import { FaPlay } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
const WordSection = ({ wordData }: { wordData: any }) => {
  const { word, phonetic, phonetics, meanings, sourceUrls } = wordData[0];
  const { audio } = phonetics.find((el: any) => el.audio !== "");
  // TODO: check if audio exists
  const wordAudio = new Audio(audio);

  return (
    <main className="space-y-12">
      <section className="flex justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold">{word}</h1>
          <p className="text-xl">{phonetic}</p>
        </div>

        {audio !== "" ? (
          <button
            onClick={() => wordAudio.play()}
            className="w-12 h-12 bg-purple-300 rounded-full p-4"
          >
            <FaPlay className="text-purple-600" />
          </button>
        ) : (
          "No audio available."
        )}
      </section>
      <div className="space-y-12">
        {meanings.map((meaning: any, index: number) => (
          <MeaningSection key={index} meaning={meaning} />
        ))}
      </div>
      {/* <div className="text-gray-400">
        {JSON.stringify(wordData) || "no data"}
      </div> */}
      <section className="text-left">
        <p className="text-gray-400">Source</p>
        <div className="flex items-end space-x-2">
          <a href={sourceUrls} className="underline">
            {sourceUrls[0]}
          </a>
          {/* align bottom of link text and icon */}
          <FiExternalLink className="mb-[2px]" />
        </div>
      </section>
    </main>
  );
};

export default WordSection;
