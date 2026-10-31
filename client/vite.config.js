import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Bring in the path module

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This forces lucide-react and all other packages to use your root React instance
      'react': path.resolve(import.meta.dirname, './node_modules/react'),
      'react-dom': path.resolve(import.meta.dirname, './node_modules/react-dom'),
    },
  },
})
