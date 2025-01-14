/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['"Anton"', 'sans-serif'],
        libre: ['"Libre Baskerville"', 'serif'],
    }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"], // Configures DaisyUI to use the light theme by default.
  },
}

