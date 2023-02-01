import MeaningSection from "./MeaningSection";
import { FaPlay } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

interface Props {
  wordData: any;
  searchWord: (e: any, term: string) => Promise<void>;
}

const WordSection = ({ wordData, searchWord }: Props) => {
  const { word, phonetic, phonetics, meanings, sourceUrls } = wordData[0];
  const audio = phonetics?.find?.((el: any) => el.audio !== "")?.audio;
  const wordAudio = new Audio(audio);
  console.log(audio);
  return (
    <main className="space-y-12">
      <section className="flex justify-between items-end">
        <div className="flex flex-col items-start space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">{word}</h1>
          <p className="text-xl text-purple-800">{phonetic}</p>
        </div>

        {audio !== undefined ? (
          <button
            onClick={() => wordAudio.play()}
            className="w-12 h-12 bg-purple-300 rounded-full p-4"
          >
            <FaPlay className="text-purple-600" />
          </button>
        ) : (
          <p className="text-gray-600">No audio available.</p>
        )}
      </section>
      <div className="space-y-12">
        {meanings.map((meaning: any, index: number) => (
          <MeaningSection
            key={index}
            meaning={meaning}
            searchWord={searchWord}
          />
        ))}
      </div>
      {/* <div className="text-gray-400">
        {JSON.stringify(wordData) || "no data"}
      </div> */}
      <section className="text-left space-y-2">
        <p className="text-gray-400">Source</p>
        <div className="flex items-end space-x-2">
          <a href={sourceUrls} className="text-gray-600 underline">
            {sourceUrls[0]}
          </a>
          {/* align bottom of link text and icon */}
          <FiExternalLink className="mb-[2px] text-gray-600" />
        </div>
      </section>
    </main>
  );
};

export default WordSection;
