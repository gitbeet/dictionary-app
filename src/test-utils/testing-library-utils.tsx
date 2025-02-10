import { render, RenderOptions, RenderResult } from "@testing-library/react";
import DarkModeProvider from "../context/darkModeContext";

// Type the renderWithContext function
const renderWithContext = (
  ui: React.ReactNode,
  options: RenderOptions = {}
): RenderResult => render(ui, { wrapper: DarkModeProvider, ...options });

// Re-export everything from @testing-library/react
export * from "@testing-library/react";

// Override render with renderWithContext
export { renderWithContext as render };
