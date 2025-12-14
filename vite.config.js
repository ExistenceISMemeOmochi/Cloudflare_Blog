import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // ↓↓↓ ここに 'server' 設定を追加/編集します ↓↓↓
  server: {
    // 外部からのアクセスを許可
    host: '0.0.0.0',

    // Cloudflare Tunnelのホスト名を許可リストに追加
    allowedHosts: [
      'blog.omochiisidiot.net',
      // 'localhost'やIPも明示的に含めておくと安全です
    ],
  },
  // ↑↑↑ ここまで ↑↑↑
})
