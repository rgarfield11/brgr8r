import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

console.log('Vite resolving alias:', path.resolve(__dirname, 'src/api'))


export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
    },
  },
})