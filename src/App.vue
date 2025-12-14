<script setup>
// router-viewを使うため、BlogListの直接インポートは不要になりました
</script>

<template>
  <header>
    <h1>OMOCHI Blog powered by Vue & Cloudflare</h1>
  </header>

  <main>
    <router-view />
  </main>
</template>

<style>
/* 全体的なスタイルはここに */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}
header {
  background-color: #333;
  color: white;
  padding: 10px 20px;
}
main {
  padding: 20px;
}
</style>
