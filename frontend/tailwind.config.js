/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Dark mode is triggered by the 'dark' class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['light', 'dark'], // Ensure both light and dark themes are enabled
  },
}
