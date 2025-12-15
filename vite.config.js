import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: [
      'dev.omochiisidiot.net',
      'blog.omochiisidiot.net',
      'localhost',
      '127.0.0.1',
    ],
  },
  
  // publicディレクトリの設定（_functionsも含める）
  publicDir: 'public',
})
