import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const appHtml = fileURLToPath(new URL("./app.html", import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    {
      name: "dev-app-html",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === "/" || req.url === "/index.html") {
            req.url = "/app.html";
          }
          next();
        });
      },
    },
  ],
  base: "/Prova-/",
  build: {
    rollupOptions: {
      input: appHtml,
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
