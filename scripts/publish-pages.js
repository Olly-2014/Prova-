import { copyFileSync, cpSync, rmSync, writeFileSync } from "node:fs";

rmSync("assets", { recursive: true, force: true });
cpSync("dist/assets", "assets", { recursive: true });
copyFileSync("dist/app.html", "dist/index.html");
copyFileSync("dist/app.html", "index.html");
copyFileSync("dist/favicon.svg", "favicon.svg");
writeFileSync(".nojekyll", "");
