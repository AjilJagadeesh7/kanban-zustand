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
        primaryDark: "#111827",
        secondaryDark: "#1F2937",
        teritiaryDark: "#374151",
        qaudDark: "#D4ADFC",
      },
    },
  },
  plugins: [],
};
