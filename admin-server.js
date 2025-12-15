import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(express.json())

// 記事を作成・更新するAPI
app.post('/api/posts/create', async (req, res) => {
  try {
    const { title, date, tags, content } = req.body

    if (!title || !date || !content) {
      return res.status(400).json({ error: 'タイトル、日付、本文は必須です' })
    }

    // slug を生成（タイトルから）
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50)

    // posts.json を読み込む
    const postsPath = path.join(__dirname, 'public/posts/posts.json')
    const postsData = JSON.parse(await fs.readFile(postsPath, 'utf-8'))

    // 新しいIDを生成
    const maxId = Math.max(...postsData.map((p) => p.id), 0)
    const newId = maxId + 1

    // 新しい記事オブジェクト
    const newPost = {
      id: newId,
      slug: slug,
      title: title,
      date: date,
      file: `${slug}.md`,
    }

    // Markdownファイルを作成
    const mdPath = path.join(__dirname, `public/posts/${slug}.md`)
    await fs.writeFile(mdPath, content, 'utf-8')

    // posts.json に追加
    postsData.push(newPost)
    await fs.writeFile(postsPath, JSON.stringify(postsData, null, 2), 'utf-8')

    res.json({ slug: slug, id: newId, message: '記事を投稿しました' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: '投稿に失敗しました: ' + error.message })
  }
})

// D1 統合用エンドポイント
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Admin API server is running' })
})

// CORS対応
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Admin API server running on http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
})
