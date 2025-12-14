<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
// URLのパラメータからIDを取得 (文字列で取得されるため、数値に変換)
const postId = ref(parseInt(route.params.id))

const post = ref(null)
const error = ref(null)

onMounted(async () => {
  try {
    // 💡 記事データ全体を取得（BlogListと同じパス）
    const response = await fetch('/posts/posts.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const allPosts = await response.json()

    // 💡 IDが一致する記事を検索
    const foundPost = allPosts.find((p) => p.id === postId.value)

    if (foundPost) {
      post.value = foundPost
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
        <p>{{ post.content }}</p>
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
