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
  // 💡 Cloudflare Tunnelからのアクセスを許可する設定
  server: {
    host: '0.0.0.0',
    allowedHosts: ['blog.omochiisidiot.net'],
  },
})
