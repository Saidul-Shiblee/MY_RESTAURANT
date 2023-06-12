/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-x-20": {
      transform: "rotateX(20deg)",
    },
    ".rotate-x-40": {
      transform: "rotateX(40deg)",
    },
    ".rotate-x-60": {
      transform: "rotateX(60deg)",
    },
    ".rotate-x-100": {
      transform: "rotateX(80deg)",
    },
    ".rotate-x-120": {
      transform: "rotateX(120deg)",
    },
    ".rotate-x-180": {
      transform: "rotateX(180deg)",
    },
    ".rotate-x-360": {
      transform: "rotateX(360deg)",
    },
  });
});

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [rotateX],
};
