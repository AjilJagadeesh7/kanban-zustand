/** @type {import('tailwindcss').Config} */
export default {
  preflight: false,
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryLight: "#E4FBFF",
        secondaryLight: "#B8B5FF",
        teritiaryLight: " #7868E6",
        primaryDark: "#0C134F",
        secondaryDark: "#1D267D",
        teritiaryDark: "#5C469C",
        qaudDark: "#D4ADFC",
      },
    },
  },
  plugins: [],
};
