/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EEF2FF", // 95% light
          100: "#E0E7FF", // 90%
          200: "#C7D2FE", // 80%
          300: "#A5B4FC", // 70%
          400: "#818CF8", // 60%
          500: "#4F46E5", // base (0%)
          600: "#4338CA", // -10%
          700: "#3730A3", // -20%
          800: "#312E81", // -30%
          900: "#1E1B4B", // -40%
        },
        sidebar: "#111827",
        surface: "#ffffff",
        background: "#f3f4f6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
