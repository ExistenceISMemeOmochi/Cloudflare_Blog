<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([]) // 記事データを格納するリアクティブな変数

onMounted(async () => {
  try {
    // 💡 public/posts.jsonへのリクエスト
    const response = await fetch('/posts.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    posts.value = await response.json()
    console.log('記事データを読み込みました:', posts.value)
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
        <h3>{{ post.title }}</h3>
        <p class="post-date">公開日: {{ post.date }}</p>
        <p>{{ post.content.substring(0, 80) + '...' }}</p>
        <a href="#">記事を読む</a>
        <hr />
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-summary {
  margin-bottom: 20px;
}
.post-date {
  color: #888;
  font-size: 0.9em;
}
</style>
