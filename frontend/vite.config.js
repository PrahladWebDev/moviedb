import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://moviedb-drab-five.vercel.app/",
      "/uploads/": "https://moviedb-drab-five.vercel.app/",
    },
  },
});
