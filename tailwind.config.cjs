/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Comic-sans"],
      mono: ["ui-monospace", "SFMono-Regular"],
    },
    extend: {
      screens: {
        "xs": "360px",
      },
    },
  },
  plugins: [],
};
