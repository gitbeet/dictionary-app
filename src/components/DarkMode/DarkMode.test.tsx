import { render, screen } from "../../test-utils/testing-library-utils";
import { userEvent } from "@testing-library/user-event";
import App from "../../App";
import { expect, test } from "vitest";

test("the button is rendered correctly", () => {
  render(<App />);
  const themeSwitchButton = screen.getByRole("switch", { name: /switch to/i });
  expect(themeSwitchButton).toBeInTheDocument();
});

test("button styles are correct when the button is clicked", async () => {
  const user = userEvent.setup();
  render(<App />);
  const themeSwitchButton = screen.getByRole("switch", { name: /switch to/i });
  expect(themeSwitchButton).toHaveClass(/bg-slate-300/i);
  await user.click(themeSwitchButton);
  expect(themeSwitchButton).toHaveClass(/bg-purple-600/i);
  // clicking the button again so I get the correct state in the next test
  await user.click(themeSwitchButton);
});

test("aria-label updates when the button is clicked", async () => {
  const user = userEvent.setup();
  render(<App />);
  const themeSwitchButton = screen.getByRole("switch", { name: /switch to/i });
  expect(themeSwitchButton).toHaveAttribute(
    "aria-label",
    "Switch to dark mode"
  );
  await user.click(themeSwitchButton);
  expect(themeSwitchButton).toHaveAttribute(
    "aria-label",
    "Switch to light mode"
  );
  await user.click(themeSwitchButton);
  expect(themeSwitchButton).toHaveAttribute(
    "aria-label",
    "Switch to dark mode"
  );
});

test("keyboard navigaton works correctly", async () => {
  const user = userEvent.setup();
  render(<App />);
  const themeSwitchButton = screen.getByRole("switch", { name: /switch to/i });
  themeSwitchButton.focus();
  expect(themeSwitchButton).toHaveFocus();
  expect(themeSwitchButton).toHaveAttribute(
    "aria-label",
    "Switch to dark mode"
  );
  await user.keyboard("{Enter}");
  expect(themeSwitchButton).toHaveAttribute(
    "aria-label",
    "Switch to light mode"
  );
  await user.keyboard("{Enter}");
  // check if tabbing away is working correctly
  await user.tab();
  expect(themeSwitchButton).not.toHaveFocus();
});
