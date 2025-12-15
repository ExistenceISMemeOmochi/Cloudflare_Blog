<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { marked } from 'marked'

const props = defineProps({
  id: String,
})
const postId = ref(Number(props.id))

const post = ref(null)
const error = ref(null)

onMounted(async () => {
  try {
    // D1 APIから全記事を取得
    const response = await fetch('/api/posts')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const allPosts = await response.json()

    // IDが一致する記事を検索
    const foundPost = allPosts.find((p) => p.id === postId.value)

    if (foundPost) {
      // contentはD1から既にMarkdownで取得されているため、HTMLに変換
      post.value = { ...foundPost, content: marked(foundPost.content) }
    } else {
      error.value = `記事ID: ${postId.value} の記事は見つかりませんでした。`
    }
  } catch (err) {
    error.value = 'データの読み込み中にエラーが発生しました。'
    console.error(err)
  }
})
</script>

<template>
  <div class="blog-post">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="post">
      <h2>{{ post.title }}</h2>
      <p class="post-meta">公開日: {{ post.date }}</p>
      <div class="post-content">
        <div v-html="post.content"></div>
      </div>

      <router-link to="/" class="back-link">← 記事一覧に戻る</router-link>
    </div>
  </div>
</template>

<style scoped>
.blog-post {
  background: white;
  padding: 30px;
  border-radius: 5px;
}
.post-meta {
  color: #666;
  font-style: italic;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}
.error-message {
  color: red;
  font-weight: bold;
}
</style>
