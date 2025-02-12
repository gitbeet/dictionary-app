import { render, screen } from "../../test-utils/testing-library-utils";
import { expect, test, vi } from "vitest";
import App from "../../App";
import userEvent from "@testing-library/user-event";

//test dark mode

test("font switcher is in the document", () => {
  render(<App />);
  const fontSwitcher = screen.getByRole("button", { name: /select font/i });
  expect(fontSwitcher).toBeInTheDocument();
});

test("font switches correctly when one of the options is clicked", async () => {
  const user = userEvent.setup();

  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

  render(<App />);
  const fontSwitcherButton = screen.getByRole("button", {
    name: /select font/i,
  });
  expect(fontSwitcherButton).toHaveTextContent(/sans/i);

  await user.click(fontSwitcherButton);

  const fontOptions = await screen.findAllByRole("button", {
    name: /switch font/i,
  });

  expect(fontOptions).toHaveLength(2);

  const monoOption = fontOptions.find(
    (button) =>
      button.getAttribute("aria-label")?.includes("Switch font to mono") ||
      button.textContent?.includes("Mono")
  );

  expect(monoOption).toBeInTheDocument();

  const serifOption = fontOptions.find(
    (button) =>
      button.getAttribute("aria-label")?.includes("Switch font to serif") ||
      button.textContent?.includes("Serif")
  );

  expect(serifOption).toBeInTheDocument();

  if (monoOption) {
    await user.click(monoOption);
  } else {
    throw new Error("Mono option was not found");
  }

  expect(fontSwitcherButton).toHaveTextContent(/monospace/i);
});
