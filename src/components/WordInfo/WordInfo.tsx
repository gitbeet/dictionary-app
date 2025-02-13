import Meaning from "./Meaning";
import { FaPause, FaPlay } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { MeaningInterface, WordDataInterface } from "../../models";
import { useState } from "react";

interface Props {
  wordData: WordDataInterface[];
  searchWord: (e: any, term: string) => Promise<void>;
}

const WordInfo = ({ wordData, searchWord }: Props) => {
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

  console.log(wordData);

  return (
    <div
      data-testid="word-info__container"
      className="space-y-12 md:pt-8"
    >
      <section className="flex justify-between items-end">
        <div className="flex flex-col items-start space-y-2">
          <h1
            data-testid="word-info__word"
            className="dark:text-slate-200 text-slate-800 text-4xl md:text-5xl font-bold"
          >
            {word}
          </h1>
          <p
            data-testid="word-info__phonetic"
            className="text-purple-800 text-xl"
          >
            {phonetic}
          </p>
        </div>

        {audio !== undefined ? (
          <button
            data-testid="word-info__audio"
            disabled={audioPlaying}
            aria-label="Play word audio"
            onClick={() => wordAudio.play()}
            className="dark:text-white dark:bg-purple-900 bg-purple-600 text-white w-12 h-12  rounded-full p-4 disabled:opacity-50"
          >
            {audioPlaying ? <FaPause /> : <FaPlay />}
          </button>
        ) : (
          <p className="dark:text-slate-400 text-slate-600">
            No audio available.
          </p>
        )}
      </section>
      <section className="space-y-12">
        {meanings.map((meaning: MeaningInterface, index: number) => (
          <Meaning
            key={index}
            meaning={meaning}
            searchWord={searchWord}
          />
        ))}
      </section>
      <article className="text-left space-y-2">
        <p className="text-slate-400">Source</p>
        <div className="flex items-end space-x-2 ">
          <a
            data-testid="word-info__source-url"
            href={sourceUrls[0]}
            target="_blank"
            className="text-slate-600 underline"
          >
            {sourceUrls}
          </a>
          {/* align bottom of link text and icon */}
          <FiExternalLink className="mb-[2px] text-slate-600" />
        </div>
      </article>
    </div>
  );
};

export default WordInfo;
