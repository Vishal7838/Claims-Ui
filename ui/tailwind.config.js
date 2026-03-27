/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Design tokens used by Claim Details screen
        background: "#faf8ff",
        surface: "#faf8ff",
        "surface-dim": "#d2d9f4",
        "surface-bright": "#faf8ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f3ff",
        "surface-container": "#eaedff",
        "surface-container-high": "#e2e7ff",
        "surface-container-highest": "#dae2fd",
        "surface-variant": "#dae2fd",
        "on-background": "#131b2e",
        "on-surface": "#131b2e",
        "on-surface-variant": "#464555",
        outline: "#777587",
        "outline-variant": "#c7c4d8",
        "primary-container": "#4f46e5",
        "on-primary": "#ffffff",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        secondary: "#505f76",
        "on-secondary": "#ffffff",
        "secondary-container": "#d0e1fb",
        "on-secondary-container": "#54647a",
        tertiary: "#005338",
        "tertiary-container": "#006e4b",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#67f4b7",

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
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
