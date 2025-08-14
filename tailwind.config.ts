import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(214 14% 89%)",
        input: "hsl(214 14% 89%)",
        ring: "hsl(214 84% 56%)",
        background: "#ffffff",
        foreground: "#0f172a",
        muted: {
          DEFAULT: "hsl(214 15% 95%)",
          foreground: "hsl(215 16% 45%)"
        }
      },
    },
  },
  plugins: [],
};
export default config;