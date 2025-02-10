import { expect, test, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
} from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

test("search bar is in the document", () => {
  render(<SearchBar searchWord={vi.fn()} />);
  const searchInput = screen.getByRole("textbox", { name: /search/i });
  expect(searchInput).toBeInTheDocument();
});

test("submit button has the correct aria-label", () => {
  render(<SearchBar searchWord={vi.fn()} />);
  const submitButton = screen.getByRole("button", { name: /search/i });
  expect(submitButton).toHaveAttribute("aria-label", "Search");
});

test("search bar starts out empty and typing updates the search term", async () => {
  const user = userEvent.setup();
  render(<SearchBar searchWord={vi.fn()} />);
  const searchInput = screen.getByRole("textbox", { name: /search/i });
  expect(searchInput).toHaveValue("");
  await user.type(searchInput, "apple");
  expect(searchInput).toHaveValue("apple");
});

test("submitting the form calls the function with the correct arguments", async () => {
  const user = userEvent.setup();
  const searchWord = vi.fn((e) => e.preventDefault());
  render(<SearchBar searchWord={searchWord} />);
  const searchInput = screen.getByRole("textbox", { name: /search/i });
  const searchForm = screen.getByRole("search");
  await user.type(searchInput, "apple");
  fireEvent.submit(searchForm);
  expect(searchWord).toHaveBeenCalledWith(expect.anything(), "apple");
});

test("pressing enter when the search input is focused submits the form", async () => {
  const user = userEvent.setup();
  const searchWord = vi.fn((e) => e.preventDefault());
  render(<SearchBar searchWord={searchWord} />);
  const searchInput = screen.getByRole("textbox", { name: /search/i });
  await user.click(searchInput);
  await user.keyboard("{Enter}");
  expect(searchWord).toHaveBeenCalledTimes(1);
});

test("clicking the search button submits the form", async () => {
  const user = userEvent.setup();
  const searchWord = vi.fn((e) => e.preventDefault());
  render(<SearchBar searchWord={searchWord} />);
  const searchInput = screen.getByRole("textbox", { name: /search/i });
  const searchButton = screen.getByRole("button", { name: /search/i });
  await user.type(searchInput, "apple");
  await user.click(searchButton);
  expect(searchWord).toHaveBeenCalledTimes(1);
  expect(searchWord).toHaveBeenCalledWith(expect.anything(), "apple");
});
