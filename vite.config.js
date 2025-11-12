import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables (from .env, .env.local, .env.development, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    optimizeDeps: {
      include: ['@mui/material', '@mui/material/styles', '@mui/system', "@mui/material/Box", "@mui/material/styles/createTheme",]
    },
    // Core plugins
    plugins: [
      react(), // React + Fast Refresh support
      tsconfigPaths() // Read aliases from tsconfig.path.json
    ],

    // Server configuration
    server: {
      port: Number(env.VITE_PORT) || 3000,
      open: true,
      strictPort: true,
      host: true
    },

    // Build configuration
    build: {
      outDir: 'build', // CRA uses 'build', so this keeps structure consistent
      sourcemap: mode === 'development',
      chunkSizeWarningLimit: 1000,
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    },

    // Resolve and extensions
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },

    // CSS and PostCSS / Tailwind support
    css: {
      devSourcemap: true
    },

    // Define global constants
    define: {
      __APP_ENV__: JSON.stringify(mode),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      'process.env': env,
    },

    // Preview (vite preview)
    preview: {
      port: 4173,
      open: false
    }
  };
});
