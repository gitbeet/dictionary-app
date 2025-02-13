export interface PhoneticsInterface {
  audio: string;
}

export interface DefinitionInterface {
  definition: string;
}
export interface MeaningInterface {
  partOfSpeech: string;
  definitions: DefinitionInterface[];
  synonyms: string[];
}

export interface WordDataInterface {
  word: string;
  phonetic: string;
  phonetics: PhoneticsInterface[];
  meanings: MeaningInterface[];
  sourceUrls: string[];
}

export type Font =
  | { type: "sans"; value: "Roboto, sans-serif"; label: "Sans-serif" }
  | { type: "serif"; value: "Roboto Serif, serif"; label: "Serif" }
  | { type: "mono"; value: "Roboto Mono, monospace"; label: "Monospace" };
