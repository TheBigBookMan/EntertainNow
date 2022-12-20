/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lobster: ["lobster", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],

  variants: {
    nocompatible: true,
  },
};
