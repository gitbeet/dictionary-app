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
  sourceUrls: string;
}
