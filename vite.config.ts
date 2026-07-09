import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
    build: {
        outDir: "dist",
        assetsDir: "assets",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                projects: resolve(__dirname, "projects.html"),
            },
        },
    },
});