import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 💡 router/index.jsをインポート

const app = createApp(App)

app.use(router) // 💡 routerをアプリケーション全体で使用可能にする
app.mount('#app')
