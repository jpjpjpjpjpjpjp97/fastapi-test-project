import * as path from "path";
import { glob } from "glob";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    root: "./",
    build: {
        outDir: "../backend/dist",
        emptyOutDir: true,
        rollupOptions: {
            input: glob.sync(path.resolve(__dirname, "*.html")),
        },
    },
    plugins: [react()],
});
