import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Gera um único arquivo HTML autocontido (JS e CSS embutidos) em dist-html/.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { outDir: "dist-html" },
});
