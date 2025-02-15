import { expect, test } from "vitest";
import { render, screen } from "../../test-utils/testing-library-utils";
import App from "../../App";
import Meaning from "./Meaning";

const mockMeaning = {
  "partOfSpeech": "noun",
  "definitions": [
    {
      "definition":
        "A wheeled vehicle that moves independently, with at least three wheels, powered mechanically, steered by a driver and mostly for personal transportation.",
      "synonyms": [
        "auto",
        "automobile",
        "carriage",
        "motor",
        "motorcar",
        "vehicle",
      ],
      "antonyms": [],
      "example": "She drove her car to the mall.",
    },
    {
      "definition":
        "A wheeled vehicle, drawn by a horse or other animal; a chariot.",
      "synonyms": [],
      "antonyms": [],
    },
    {
      "definition": "An unpowered unit in a railroad train.",
      "synonyms": ["railcar", "wagon"],
      "antonyms": [],
      "example": "The conductor coupled the cars to the locomotive.",
    },
    {
      "definition":
        "An individual vehicle, powered or unpowered, in a multiple unit.",
      "synonyms": [],
      "antonyms": [],
      "example":
        "The 11:10 to London was operated by a 4-car diesel multiple unit.",
    },
    {
      "definition":
        "A passenger-carrying unit in a subway or elevated train, whether powered or not.",
      "synonyms": [],
      "antonyms": [],
      "example":
        "From the frontmost car of the subway, he filmed the progress through the tunnel.",
    },
    {
      "definition":
        "A rough unit of quantity approximating the amount which would fill a railroad car.",
      "synonyms": ["carload", "wagonload"],
      "antonyms": [],
      "example": "We ordered five hundred cars of gypsum.",
    },
    {
      "definition":
        "The moving, load-carrying component of an elevator or other cable-drawn transport mechanism.",
      "synonyms": [],
      "antonyms": [],
      "example": "Fix the car of the express elevator - the door is sticking.",
    },
    {
      "definition":
        "The passenger-carrying portion of certain amusement park rides, such as Ferris wheels.",
      "synonyms": ["carriage"],
      "antonyms": [],
      "example":
        "The most exciting part of riding a Ferris wheel is when your car goes over the top.",
    },
    {
      "definition":
        "The part of an airship, such as a balloon or dirigible, which houses the passengers and control apparatus.",
      "synonyms": ["basket", "gondola"],
      "antonyms": [],
    },
    {
      "definition": "A sliding fitting that runs along a track.",
      "synonyms": [],
      "antonyms": [],
    },
    {
      "definition": "The aggregate of desirable characteristics of a car.",
      "synonyms": [],
      "antonyms": [],
      "example": "Buy now! You can get more car for your money.",
    },
    {
      "definition": "A floating perforated box for living fish.",
      "synonyms": [],
      "antonyms": [],
    },
  ],
  "synonyms": [
    "auto",
    "automobile",
    "carriage",
    "motor",
    "motorcar",
    "vehicle",
    "basket",
    "gondola",
    "carload",
    "wagonload",
    "carriage",
    "railcar",
    "wagon",
  ],
  "antonyms": [],
};

test("No meanings are present when the page initially loads", () => {
  render(<App />);
  const meaningElements = screen.queryAllByTestId("meaning__container");
  expect(meaningElements).toHaveLength(0);
});

test("elements are rendering correctly given a valid meaning prop", () => {
  render(
    <Meaning
      meaning={mockMeaning}
      searchWord={async () => void 0}
    />
  );
  const partOfSpeech = screen.getByTestId("meaning__part-of-speech");
  expect(partOfSpeech).toHaveTextContent("noun");

  const listHeader = screen.getByTestId("meaning__list-header");
  expect(listHeader).toHaveTextContent("Meaning");

  const listItems = screen.getAllByTestId("meaning__list-item");
  expect(listItems).toHaveLength(12);

  const synonymsHeader = screen.getByTestId("meaning__synonyms-header");
  expect(synonymsHeader).toHaveTextContent("Synonyms");

  const synonyms = screen.getAllByTestId("meaning__synonym-item");
  expect(synonyms).toHaveLength(13);
});
