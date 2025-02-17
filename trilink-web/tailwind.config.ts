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
        "gray-light": "#F9F9F9",
        "gray-chateau": "#A7A7A7",
        "tropical-blue": "#D8D8F4",
      },
    },
  },
  plugins: [],
};
export default config;
