import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Only add 'root' if your index.html is *not* directly in frontend
export default defineConfig({
  plugins: [react()],
  root: '.',        // points to the folder containing index.html
  build: {
    outDir: 'dist',
  },
})
