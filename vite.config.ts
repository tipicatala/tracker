import { defineConfig, splitVendorChunkPlugin, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

import path from "path";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return defineConfig({
    plugins: [react(), tsconfigPaths(), splitVendorChunkPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    assetsInclude: ["@/assets/*.ttf"],
    css: {
      modules: {
        scopeBehaviour: "local",
        generateScopedName: function (name: string, filename: string) {
          const componentName = path.basename(path.dirname(filename));

          if (filename.includes("desktop")) {
            return `${componentName}_desktop_${name}`;
          }

          if (filename.includes("mobile")) {
            return `${componentName}_mobile_${name}`;
          }
          return `${componentName}_${name}`;
        },
      },
    },
    build: {
      minify: false,
      rollupOptions: {
        input: {
          main: "src/main.tsx",
          index: "index.html",
        },
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",

          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
              return "assets/images/[name]-[hash][extname]";
            }

            if (/\.(ttf)$/.test(name ?? "")) {
              return "assets/fonts/[name]-[hash][extname]";
            }

            if (/\.css$/.test(name ?? "")) {
              return "assets/css/[name]-[hash][extname]";
            }

            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },
  });
};
