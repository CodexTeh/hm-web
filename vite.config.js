import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
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
      esbuildOptions: { 
        target: "es2022", // Modern target to avoid unnecessary transpilation
      },
      include: ["react", "react-dom", "react-redux", "redux-persist"],
    },

    plugins: [
      react({
        // SWC handles JSX transformation without Babel, avoiding unnecessary transpilation
        // This eliminates the need for Babel plugins like transform-classes and transform-spread
      }),

      tsconfigPaths(),

      // ⚡ Image optimization pipeline
      imagetools(),

      // ⚡ Unused CSS removal - aggressive purging for production
      ...(mode === "production"
        ? [
            purgeCss({
              content: [
                "./index.html",
                "./public/index.html",
                "./src/**/*.{js,jsx,ts,tsx}",
                "./build/index.html", // Include built HTML for analysis
              ],
              safelist: {
                // Only keep MUI classes that are actually used (not all css-* classes)
                standard: [
                  /^Mui/, // MUI component classes
                  /^makeStyles-/, // Legacy makeStyles
                  // Keep specific MUI classes referenced in index.css
                  /^css-1vdl86r-MuiTypography-root/,
                  /^css-k7ykxg-MuiPaper-root-MuiAccordion-root/,
                  /^css-15rfbsb-MuiSvgIcon-root-MuiStepIcon-root/,
                  /^css-ay3cf-MuiPaper-root-MuiAppBar-root/,
                ],
                deep: [/^leaflet/, /^Toastify/],
                greedy: [/^product-/, /^custom-/],
              },
              // Remove unused CSS variables and keyframes
              variables: true,
              keyframes: true,
              fontFace: true,
              // More aggressive purging - extract all potential class names
              defaultExtractor: (content) => {
                // Extract class names, including CSS-in-JS patterns
                const classMatches = content.match(/[A-Za-z0-9-_/:]+/g) || [];
                // Also match className patterns and sx prop values
                const classNameMatches = content.match(/className[=:]\s*["']([^"']+)["']/g) || [];
                const sxMatches = content.match(/sx\s*=\s*\{[^}]*\}/g) || [];
                return [...classMatches, ...classNameMatches, ...sxMatches];
              },
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
      cssCodeSplit: true, // Split CSS per route/component to reduce unused CSS
      chunkSizeWarningLimit: 1200,

      // Modern browser targets - these browsers natively support classes, spread, etc.
      target: ["es2022", "chrome90", "firefox88", "safari14", "edge90"],

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
        target: "es2022", // Modern target - no transpilation of classes, spread, etc.
        treeShaking: true,
        pure: ["console.log"],
        // Don't minify syntax that modern browsers support natively
        legalComments: "none",
      },

      rollupOptions: {
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },

        // No need to exclude Babel plugins anymore - we're using SWC instead

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

        // output: {
        //   // ⚡ STABLE CHUNK MAP (React-safe)
        //   manualChunks(id) {
        //     // 1. React core (strict match only)
        //     if (
        //       /node_modules[\\/](react|react-dom)[\\/](index\.js|client\.js)$/.test(
        //         id
        //       )
        //     ) {
        //       return "react-core";
        //     }

        //     // 2. Redux ecosystem
        //     if (
        //       /node_modules[\\/](redux|redux-persist|redux-saga|redux-thunk|@reduxjs\/toolkit)[\\/]/.test(
        //         id
        //       )
        //     ) {
        //       return "redux-vendor";
        //     }

        //     // 3. MUI + Emotion
        //     if (
        //       id.includes("node_modules/@mui") ||
        //       id.includes("node_modules/@emotion")
        //     ) {
        //       return "mui-vendor";
        //     }

        //     // 4. Big utilities
        //     if (
        //       id.includes("node_modules/axios") ||
        //       id.includes("node_modules/dayjs") ||
        //       id.includes("node_modules/leaflet") ||
        //       id.includes("node_modules/lodash")
        //     ) {
        //       return "utils-vendor";
        //     }

        //     // 5. Everything else
        //     if (id.includes("node_modules")) {
        //       return "vendor";
        //     }
        //   },

        //   entryFileNames: "assets/js/[name]-[hash].js",
        //   chunkFileNames: "assets/js/[name]-[hash].js",
        //   assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        // },
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
