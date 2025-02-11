import MeaningSection from "./MeaningSection";
import { FaPause, FaPlay } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { MeaningInterface, WordDataInterface } from "../models";
import { useState } from "react";

interface Props {
  wordData: WordDataInterface[];
  searchWord: (e: any, term: string) => Promise<void>;
}

const WordSection = ({ wordData, searchWord }: Props) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const { word, phonetic, phonetics, meanings, sourceUrls } = wordData[0];
  const audio = phonetics?.find?.((el: any) => el.audio !== "")?.audio;
  const wordAudio = new Audio(audio);

  wordAudio.addEventListener("play", () => {
    setAudioPlaying(true);
  });
  wordAudio.addEventListener("ended", () => {
    setAudioPlaying(false);
  });

  console.log(audio);
  return (
    <main className="space-y-12 md:pt-8">
      <section className="flex justify-between items-end">
        <div className="flex flex-col items-start space-y-2">
          <h1 className="dark:text-gray-200 text-gray-800 text-4xl md:text-5xl font-bold">
            {word}
          </h1>
          <p className="text-purple-800 text-xl">{phonetic}</p>
        </div>

        {audio !== undefined ? (
          <button
            disabled={audioPlaying}
            aria-label="Play word audio"
            onClick={() => wordAudio.play()}
            className="dark:text-white dark:bg-purple-900 bg-purple-600 text-white w-12 h-12  rounded-full p-4 disabled:opacity-50"
          >
            {audioPlaying ? <FaPause /> : <FaPlay />}
          </button>
        ) : (
          <p className="dark:text-gray-400 text-gray-600">
            No audio available.
          </p>
        )}
      </section>
      <div className="space-y-12">
        {meanings.map((meaning: MeaningInterface, index: number) => (
          <MeaningSection
            key={index}
            meaning={meaning}
            searchWord={searchWord}
          />
        ))}
      </div>
      <section className="text-left space-y-2">
        <p className="text-gray-400">Source</p>
        <div className="flex items-end space-x-2 ">
          <a
            href={sourceUrls}
            target="_blank"
            className="text-gray-600 underline"
          >
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
