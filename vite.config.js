import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import purgeCss from "vite-plugin-purgecss";
import critical from "rollup-plugin-critical";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(async ({ mode }) => {
  const { imagetools } = await import("vite-imagetools");
  const env = loadEnv(mode, process.cwd(), "");

  // Only expose VITE_ env vars
  const safeEnv = Object.fromEntries(
    Object.entries(env).filter(([key]) => key.startsWith("VITE_"))
  );

  return {
    // ⚡ Faster Dev, Pre-bundled deps
    optimizeDeps: {
      esbuildOptions: { target: "es2020" },
      include: ["react", "react-dom", "react-redux", "redux-persist"],
    },

    plugins: [
      react({
        jsxRuntime: "automatic",
        babel: { plugins: [] },
      }),

      tsconfigPaths(),

      // ⚡ Image optimization pipeline
      imagetools(),

      // ⚡ Unused CSS removal
      ...(mode === "production"
        ? [
            purgeCss({
              content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
              safelist: {
                standard: [/^Mui/, /^css-/, /^makeStyles-/],
                deep: [
                  /^leaflet/,
                  /^Toastify/,
                ],
                greedy: [/^product-/, /^custom-/],
              },
              variables: true,
              keyframes: true,
            }),
          ]
        : []),

      // ⚡ Critical CSS extraction (homepage only for now)
      // Only runs if ENABLE_CRITICAL_CSS env var is set and server is available
      ...(mode === "production" && env.ENABLE_CRITICAL_CSS === "true"
        ? [
            critical({
              criticalUrl: "http://localhost:" + (env.VITE_PORT || 3000),
              criticalBase: "./build/",
              criticalPages: [{ uri: "/", template: "index.html" }],
              inline: true,
              minify: true,
              extract: true,
            }),
          ]
        : []),
    ],

    // ⚡ Stable server environment
    server: {
      port: Number(env.VITE_PORT) || 3000,
      open: true,
      strictPort: true,
      host: true,
    },

    build: {
      outDir: "build",
      sourcemap: mode === "development",
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1200,

      target: ["chrome90", "firefox88", "safari14", "edge90", "es2020"],

      // ⚡ JS Optimization — remove unused JS aggressively
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: mode === "production",
          drop_debugger: true,
          unused: true,
          dead_code: true,
          passes: 3,
          pure_funcs: ["console.log", "console.info"],
        },
        format: { comments: false },
      },

      // ESBuild-level treeshaking (extra layer)
      esbuild: {
        target: "es2020",
        treeShaking: true,
        pure: ["console.log"],
      },

      rollupOptions: {
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },

        plugins: [
          // ⚡ Visualizer (opens report after build)
          visualizer({
            filename: "bundle-report.html",
            template: "treemap",
            gzipSize: true,
            brotliSize: true,
            open: true,
          }),
        ],

        output: {
          // ⚡ STABLE CHUNK MAP (React-safe)
          manualChunks(id) {
            // 1. React core (strict match only)
            if (
              /node_modules[\\/](react|react-dom)[\\/](index\.js|client\.js)$/.test(
                id
              )
            ) {
              return "react-core";
            }

            // 2. Redux ecosystem
            if (
              /node_modules[\\/](redux|redux-persist|redux-saga|redux-thunk|@reduxjs\/toolkit)[\\/]/.test(
                id
              )
            ) {
              return "redux-vendor";
            }

            // 3. MUI + Emotion
            if (
              id.includes("node_modules/@mui") ||
              id.includes("node_modules/@emotion")
            ) {
              return "mui-vendor";
            }

            // 4. Big utilities
            if (
              id.includes("node_modules/axios") ||
              id.includes("node_modules/dayjs") ||
              id.includes("node_modules/leaflet") ||
              id.includes("node_modules/lodash")
            ) {
              return "utils-vendor";
            }

            // 5. Everything else
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },

          entryFileNames: "assets/js/[name]-[hash].js",
          chunkFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },

    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      dedupe: ["react", "react-dom"],
    },

    define: {
      __APP_ENV__: JSON.stringify(mode),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      "process.env": safeEnv,
    },

    preview: {
      port: 4173,
      open: false,
    },
  };
});
