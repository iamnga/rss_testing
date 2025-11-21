import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2b6cae",
        secondary: "#f19b38",
        background: "#fefefe",
        accent: "#92b5d7",
      },
    },
  },
  plugins: [],
};

export default config;
