import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Vite configuration for Electron renderer process
export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'src/renderer'), // tell Vite where renderer lives
  base: './', // ensures relative paths (fixes blank screen in production)
  build: {
    outDir: path.resolve(__dirname, 'dist/renderer'), // output folder for renderer build
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/renderer/index.html'), // entry point
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/renderer'), // allows @/ imports
    },
  },
  server: {
    port: 5173, // dev server port
    strictPort: true, // fail if port is busy (helps Electron dev mode)
  },
})
