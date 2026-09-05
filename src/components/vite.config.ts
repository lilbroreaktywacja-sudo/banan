// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const appRoot = fileURLToPath(new URL(".", import.meta.url));
const assetsRoot = fileURLToPath(new URL("../assets", import.meta.url));

export default defineConfig({
  vite: {
    publicDir: fileURLToPath(new URL("../../public", import.meta.url)),
    resolve: {
      alias: [
        { find: /^@\/components\/(.*)$/, replacement: `${appRoot}/$1` },
        { find: /^@\/ui\/(.*)$/, replacement: `${appRoot}/ui/$1` },
        { find: /^@\/lib\/(.*)$/, replacement: `${appRoot}/lib/$1` },
        { find: /^@\/hooks\/(.*)$/, replacement: `${appRoot}/hooks/$1` },
        { find: /^@\/assets\/(.*)$/, replacement: `${assetsRoot}/$1` },
        { find: /^@\/(.*)$/, replacement: `${appRoot}/$1` },
      ],
    },
  },
  tanstackStart: {
    srcDirectory: ".",
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    router: {
      entry: "router",
      routesDirectory: "./routes",
    },
  },
});
