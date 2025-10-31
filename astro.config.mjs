// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        name: "IBM Plex Sans",
        cssVariable: "--font-ibm-plex-sans",
        provider: fontProviders.google(),
        weights: ["400 600"],
        subsets: ["latin"],
        fallbacks: ["sans-serif"],
      },
      {
        name: "IBM Plex Mono",
        cssVariable: "--font-ibm-plex-mono",
        provider: fontProviders.google(),
        weights: ["400 600"],
        subsets: ["latin"],
        fallbacks: ["monospace"],
      },
    ],
  },

  site: "https://arland.dev",

  vite: {
    plugins: [tailwindcss()],
  },
});
