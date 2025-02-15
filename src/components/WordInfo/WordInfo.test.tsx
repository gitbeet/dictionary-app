import { expect, test } from "vitest";
import { render, screen } from "../../test-utils/testing-library-utils";
import App from "../../App";
import WordInfo from "./WordInfo";
import { WordDataInterface } from "../../models";

const mockWordData: WordDataInterface[] = [
  {
    "word": "apple",
    "phonetic": "/ˈæp.əl/",
    "phonetics": [
      {
        "audio":
          "https://api.dictionaryapi.dev/media/pronunciations/en/apple-uk.mp3",
      },
      {
        "audio":
          "https://api.dictionaryapi.dev/media/pronunciations/en/apple-us.mp3",
      },
    ],
    "meanings": [
      {
        "partOfSpeech": "noun",
        "definitions": [
          {
            "definition":
              "A common, round fruit produced by the tree Malus domestica, cultivated in temperate climates.",
          },
          {
            "definition":
              "Any of various tree-borne fruits or vegetables especially considered as resembling an apple; also (with qualifying words) used to form the names of other specific fruits such as custard apple, rose apple, thorn apple etc.",
          },
          {
            "definition":
              "The fruit of the Tree of Knowledge, eaten by Adam and Eve according to post-Biblical Christian tradition; the forbidden fruit.",
          },
          {
            "definition":
              "A tree of the genus Malus, especially one cultivated for its edible fruit; the apple tree.",
          },
          {
            "definition": "The wood of the apple tree.",
          },
          {
            "definition":
              "(in the plural) Short for apples and pears, slang for stairs.",
          },
          {
            "definition": "The ball in baseball.",
          },
          {
            "definition":
              "When smiling, the round, fleshy part of the cheeks between the eyes and the corners of the mouth.",
          },
          {
            "definition":
              "A Native American or red-skinned person who acts and/or thinks like a white (Caucasian) person.",
          },
          {
            "definition": "(ice hockey slang) An assist.",
          },
        ],
        "synonyms": [],
      },
      {
        "partOfSpeech": "verb",
        "definitions": [
          {
            "definition": "To become apple-like.",
          },
          {
            "definition": "To form buds.",
          },
        ],
        "synonyms": [],
      },
    ],
    "sourceUrls": ["https://en.wiktionary.org/wiki/apple"],
  },
];

test("word info is not present initially when the page loads", () => {
  render(<App />);
  const wordInfoContainer = screen.queryByTestId("word-info__container");
  expect(wordInfoContainer).not.toBeInTheDocument();
});

test("correct word info is displayed", () => {
  render(
    <WordInfo
      wordData={mockWordData}
      searchWord={async () => void 0}
      message=""
    />
  );

  const word = screen.getByTestId("word-info__word");
  expect(word).toHaveTextContent("apple");

  const pronunciation = screen.getByTestId("word-info__phonetic");
  expect(pronunciation).toHaveTextContent("/ˈæp.əl/");

  const audioButton = screen.getByTestId("word-info__audio");
  expect(audioButton).toBeEnabled();

  const meanings = screen.getAllByTestId("meaning__container");
  expect(meanings).toHaveLength(2);

  const sourceUrl = screen.getByTestId("word-info__source-url");
  expect(sourceUrl).toHaveTextContent("https://en.wiktionary.org/wiki/apple");
});

test("message is displayed correctly and has the right styling", () => {
  render(
    <WordInfo
      wordData={null}
      searchWord={async () => void 0}
      message="Test message"
    />
  );

  const message = screen.getByTestId("message");
  expect(message).toHaveTextContent("Test message");
  expect(message).toHaveClass("text-red-500");
});
