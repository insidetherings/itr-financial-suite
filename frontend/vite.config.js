import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration
export default defineConfig({
  plugins: [react()],
  root: '.',  // look for index.html in the same folder as this config
  build: {
    outDir: 'dist',  // build output folder
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html', // explicitly tell Rollup where to start
    },
  },
})
