import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { render, screen } from "../test-utils/testing-library-utils";
import App from "../App";
import userEvent from "@testing-library/user-event";

import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const mockWordData = [
  {
    "word": "car",
    "phonetic": "/kɑː/",
    "phonetics": [
      {
        "text": "/kɑː/",
        "audio":
          "https://api.dictionaryapi.dev/media/pronunciations/en/car-uk.mp3",
        "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=9014179",
        "license": {
          "name": "BY 3.0 US",
          "url": "https://creativecommons.org/licenses/by/3.0/us",
        },
      },
      {
        "text": "/kɑɹ/",
        "audio":
          "https://api.dictionaryapi.dev/media/pronunciations/en/car-us.mp3",
        "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=424729",
        "license": {
          "name": "BY-SA 3.0",
          "url": "https://creativecommons.org/licenses/by-sa/3.0",
        },
      },
    ],
    "meanings": [
      {
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
            "example":
              "Fix the car of the express elevator - the door is sticking.",
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
            "definition":
              "The aggregate of desirable characteristics of a car.",
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
      },
    ],
    "license": {
      "name": "CC BY-SA 3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0",
    },
    "sourceUrls": ["https://en.wiktionary.org/wiki/car"],
  },
  {
    "word": "car",
    "phonetic": "/kɑː/",
    "phonetics": [
      {
        "text": "/kɑː/",
        "audio":
          "https://api.dictionaryapi.dev/media/pronunciations/en/car-uk.mp3",
        "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=9014179",
        "license": {
          "name": "BY 3.0 US",
          "url": "https://creativecommons.org/licenses/by/3.0/us",
        },
      },
      {
        "text": "/kɑɹ/",
        "audio":
          "https://api.dictionaryapi.dev/media/pronunciations/en/car-us.mp3",
        "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=424729",
        "license": {
          "name": "BY-SA 3.0",
          "url": "https://creativecommons.org/licenses/by-sa/3.0",
        },
      },
    ],
    "meanings": [
      {
        "partOfSpeech": "noun",
        "definitions": [
          { "definition": "A turn.", "synonyms": [], "antonyms": [] },
        ],
        "synonyms": [],
        "antonyms": [],
      },
    ],
    "license": {
      "name": "CC BY-SA 3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0",
    },
    "sourceUrls": ["https://en.wiktionary.org/wiki/car"],
  },
  {
    "word": "car",
    "phonetic": "/kɑː/",
    "phonetics": [
      {
        "text": "/kɑː/",
        "audio":
          "https://api.dictionaryapi.dev/media/pronunciations/en/car-uk.mp3",
        "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=9014179",
        "license": {
          "name": "BY 3.0 US",
          "url": "https://creativecommons.org/licenses/by/3.0/us",
        },
      },
      {
        "text": "/kɑɹ/",
        "audio":
          "https://api.dictionaryapi.dev/media/pronunciations/en/car-us.mp3",
        "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=424729",
        "license": {
          "name": "BY-SA 3.0",
          "url": "https://creativecommons.org/licenses/by-sa/3.0",
        },
      },
    ],
    "meanings": [
      {
        "partOfSpeech": "noun",
        "definitions": [
          {
            "definition":
              "The first part of a cons in LISP. The first element of a list",
            "synonyms": [],
            "antonyms": [],
          },
        ],
        "synonyms": [],
        "antonyms": ["cdr"],
      },
    ],
    "license": {
      "name": "CC BY-SA 3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0",
    },
    "sourceUrls": ["https://en.wiktionary.org/wiki/car"],
  },
];

const mockSynonymData = [
  {
    "word": "auto",
    "phonetic": "/ˈɑtoʊ/",
    "phonetics": [
      { "text": "/ˈɑtoʊ/", "audio": "" },
      { "text": "/ˈɔːtəʊ/", "audio": "" },
      { "text": "/ˈɑtoʊ/", "audio": "" },
    ],
    "meanings": [
      {
        "partOfSpeech": "noun",
        "definitions": [
          {
            "definition": "An automobile.",
            "synonyms": [],
            "antonyms": [],
            "example": "My brother is an auto mechanic.",
          },
          {
            "definition": "A setting for automatic operation.",
            "synonyms": ["automatic"],
            "antonyms": ["manual"],
            "example": "Put it on auto.",
          },
          {
            "definition": "An automatic gearbox / transmission.",
            "synonyms": [],
            "antonyms": [],
            "example":
              "A body coloured centre pillar signalled the arrival of an electronic four-speed auto, slight suspension revisions and minor trim changes.",
          },
          {
            "definition": "A car with an automatic gearbox / transmission.",
            "synonyms": [],
            "antonyms": [],
            "example":
              "It wasn't too bad but we did hire an auto (couldn't imagine changing gears with my right hand).",
          },
        ],
        "synonyms": ["automobile", "car", "motor", "motorcar", "automatic"],
        "antonyms": ["manual"],
      },
      {
        "partOfSpeech": "verb",
        "definitions": [
          {
            "definition": "To travel by automobile.",
            "synonyms": [],
            "antonyms": [],
          },
        ],
        "synonyms": [],
        "antonyms": [],
      },
      {
        "partOfSpeech": "adjective",
        "definitions": [
          {
            "definition":
              "Capable of operating without external control or intervention.",
            "synonyms": [],
            "antonyms": [],
            "example":
              "The automatic clothes washer was a great labor-saving device.",
          },
          {
            "definition": "Done out of habit or without conscious thought.",
            "synonyms": [],
            "antonyms": [],
            "example": "Absent-minded doodling is a form of automatic art.",
          },
          {
            "definition":
              "Necessary, inevitable, prescribed by logic, law, etc.",
            "synonyms": [],
            "antonyms": [],
            "example":
              "Spitting at another player means an automatic red card.",
          },
          {
            "definition":
              "(of a firearm such as a machine gun) Firing continuously as long as the trigger is pressed until ammunition is exhausted.",
            "synonyms": [],
            "antonyms": [],
            "example":
              "Fully automatic weapons cannot be legally owned by private citizens in the US, except in very special circumstances, as by private security companies.",
          },
          {
            "definition":
              "(of a handgun) An autoloader; a semi-automatic or self-loading pistol, as opposed to a revolver or other manually actuated handgun, which fires one shot per pull of the trigger; distinct from machine guns.",
            "synonyms": [],
            "antonyms": [],
            "example":
              "The US Army adopted John Browning's M1911 pistol as its sidearm, chambered in .45 ACP (Automatic Colt Pistol).",
          },
          {
            "definition":
              "(of a local variable) Automatically added to and removed from the stack during the course of function calls.",
            "synonyms": [],
            "antonyms": [],
          },
          {
            "definition":
              "(of a group) Having one or more finite-state automata",
            "synonyms": [],
            "antonyms": [],
          },
        ],
        "synonyms": ["instinctive", "perfunctory", "thoughtless"],
        "antonyms": ["manual", "non-automatic", "voluntary"],
      },
    ],
    "license": {
      "name": "CC BY-SA 3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0",
    },
    "sourceUrls": [
      "https://en.wiktionary.org/wiki/auto",
      "https://en.wiktionary.org/wiki/automatic",
    ],
  },
  {
    "word": "auto",
    "phonetic": "/ˈɑtoʊ/",
    "phonetics": [
      { "text": "/ˈɑtoʊ/", "audio": "" },
      { "text": "/ˈɔːtəʊ/", "audio": "" },
      { "text": "/ˈɑtoʊ/", "audio": "" },
    ],
    "meanings": [
      {
        "partOfSpeech": "noun",
        "definitions": [
          {
            "definition": "An autorickshaw.",
            "synonyms": [],
            "antonyms": [],
            "example":
              "... users are often unable to note down the number of the taxi or the auto as the driver will just zoom past.",
          },
        ],
        "synonyms": [],
        "antonyms": [],
      },
    ],
    "license": {
      "name": "CC BY-SA 3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0",
    },
    "sourceUrls": ["https://en.wiktionary.org/wiki/auto"],
  },
];

const server = setupServer(
  http.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/:word`,
    ({ params }) => {
      const { word } = params;
      if (word === "word-that-does-not-exist-test") {
        return HttpResponse.json(
          { title: "No Definitions Found" },
          { status: 404 }
        );
      }

      if (word === "car") {
        return HttpResponse.json(mockWordData, { status: 200 });
      }
      if (word === "auto") {
        return HttpResponse.json(mockSynonymData, { status: 200 });
      }
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("searching for a word", async () => {
  const user = userEvent.setup();
  render(<App />);
  const searchButton = screen.getByRole("button", { name: "Search" });
  const searchInput = screen.getByRole("textbox", {
    name: "Search a word",
  });

  // check if looking for an empty string displays the correct message
  expect(searchInput).toHaveValue("");
  await user.click(searchButton);
  const message = screen.getByTestId("message");
  expect(message).toHaveTextContent("Please enter a word");

  //   Check if looking for a non-existing word displays the correct message
  await user.type(searchInput, "word-that-does-not-exist-test");
  await user.click(searchButton);
  const wordNotFoundMessage = await screen.findByTestId("message");
  expect(wordNotFoundMessage).toHaveTextContent("No Definitions Found");

  // Looking for an existing word flow
  await user.clear(searchInput);
  await user.type(searchInput, "car");
  await user.click(searchButton);
  const word = await screen.findByTestId("word-info__word");
  expect(word).toHaveTextContent("car");

  // Clicking on synonym displays its word data
  const synonyms = await screen.findAllByTestId("meaning__synonym-item");
  const autoSynonym = synonyms.find((s) => s.textContent === "auto");
  if (!autoSynonym) throw new Error("Synonym element not found");
  await user.click(autoSynonym);
  const updatedWord = await screen.findByTestId("word-info__word");
  expect(updatedWord).toHaveTextContent("auto");
});
