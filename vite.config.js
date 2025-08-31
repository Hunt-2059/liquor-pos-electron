import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'src'), // root is just /src now
  base: './', // important for Electron packaged app
  build: {
    outDir: path.resolve(__dirname, 'dist'), // build output
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.html'), // entry HTML
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // so you can use @/components/...
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
})
