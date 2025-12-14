import { createRouter, createWebHistory } from 'vue-router'
import BlogList from '../components/BlogList.vue' // 記事一覧画面
import BlogPost from '../components/BlogPost.vue' // 記事詳細画面

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'List',
      component: BlogList,
    },
    {
      // 💡 動的な記事詳細パス
      path: '/post/:id',
      name: 'Post',
      component: BlogPost,
      props: true, // パラメータをpropsとしてコンポーネントに渡す
    },
  ],
})

export default router
