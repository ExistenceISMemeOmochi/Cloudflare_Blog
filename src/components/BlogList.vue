<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router' // router-linkを使用するためにインポート

const posts = ref([])

onMounted(async () => {
  try {
    // 💡 修正後のパスから取得
    const response = await fetch('/posts/posts.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    posts.value = await response.json()
  } catch (error) {
    console.error('記事データの読み込みに失敗しました:', error)
  }
})
</script>

<template>
  <div>
    <h2>ブログ記事一覧</h2>
    <div v-if="posts.length === 0">記事がまだありません。</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id" class="post-summary">
        <router-link :to="{ name: 'Post', params: { id: post.id } }">
          <h3>{{ post.title }}</h3>
        </router-link>

        <p class="post-date">公開日: {{ post.date }}</p>

        <router-link :to="{ name: 'Post', params: { id: post.id } }" class="read-more">
          記事を読む →
        </router-link>
        <hr />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* style.cssの内容を適宜こちらに移動するか、別のCSSファイルに記述 */
.post-summary {
  margin-bottom: 20px;
  background: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
h3 a {
  text-decoration: none;
  color: #333;
}
.read-more {
  display: inline-block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}
</style>
