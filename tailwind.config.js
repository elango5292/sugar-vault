/** @type {import('tailwindcss').Config} */
import themeJson from "./theme.json"

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx", "./components/**/*.jsx"],
  plugins: [],
  theme: {
    extend: {
      colors: themeJson.colors
    }
  }
}
