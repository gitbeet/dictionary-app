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
  // mock an empty local storage
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

  const user = userEvent.setup();

  render(<App />);
  // get the main button
  const fontSwitcherButton = screen.getByRole("button", {
    name: /select font/i,
  });
  // assert the correct default font value when no localstorage value is present
  expect(fontSwitcherButton).toHaveTextContent(/sans/i);
  // click the button
  await user.click(fontSwitcherButton);

  const fontOptions = screen.getAllByRole("button", {
    name: /switch font/i,
  });
  // expect 2 options (3 overall by project requirements , 1 active , 2 to choose from)
  expect(fontOptions).toHaveLength(2);

  const monoOption = fontOptions.find(
    (button) =>
      button.getAttribute("aria-label")?.includes("Switch font to mono") ||
      button.textContent?.includes("Mono")
  );
  // assert that the mono option is in the document
  expect(monoOption).toBeInTheDocument();

  const serifOption = fontOptions.find(
    (button) =>
      button.getAttribute("aria-label")?.includes("Switch font to serif") ||
      button.textContent?.includes("Serif")
  );
  // assert that the serif option is in the document
  expect(serifOption).toBeInTheDocument();
  // click the mono option
  if (monoOption) {
    await user.click(monoOption);
  } else {
    throw new Error("Mono option was not found");
  }
  // assert that the main button text has changed to reflect the selected option
  expect(fontSwitcherButton).toHaveTextContent(/monospace/i);
});

test("working keyboard navigation", async () => {
  // mock an empty local storage
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

  const user = userEvent.setup();
  render(<App />);
  // get button
  const fontSwitcherButton = screen.getByRole("button", {
    name: /select font/i,
  });
  // focus button
  fontSwitcherButton.focus();
  // press enter to open the menu
  await user.keyboard("{Enter}");

  const serifOption = screen.getByRole("button", {
    name: "Switch font to serif",
  });
  // tab to focus the first option (which is the serif in this case)
  await user.tab();
  // assert that the serif option is focused
  expect(serifOption).toHaveFocus();

  const monoOption = screen.getByRole("button", {
    name: "Switch font to monospace",
  });
  // tab again
  await user.tab();
  // assert that the mono option is focused
  expect(monoOption).toHaveFocus();

  // tab one last time
  await user.tab();
  // assert that the focus went back to the main button
  expect(fontSwitcherButton).toHaveFocus();
  //press escape
  await user.keyboard("{Escape}");
  // assert that the options are not focusable
  expect(serifOption).toHaveAttribute("tabIndex", "-1");
  expect(monoOption).toHaveAttribute("tabIndex", "-1");
  // press tab again
  await user.tab();
  // assert that the button is no longer focused
  expect(fontSwitcherButton).not.toHaveFocus();
});
