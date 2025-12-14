export async function onRequest(context) {
  const { DB } = context.env

  // POSTリクエストのみ受け付ける
  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const data = await context.request.json()

    // バリデーション
    if (!data.title || !data.slug || !data.content || !data.date) {
      return new Response(JSON.stringify({ error: '必須項目が不足しています' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // DBに挿入
    await DB.prepare(
      'INSERT INTO posts (slug, title, content, date, tags) VALUES (?, ?, ?, ?, ?)'
    ).bind(data.slug, data.title, data.content, data.date, data.tags || '').run()

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
```

---

## 使い方 🎯

### 既存の記事はそのまま表示される

`https://blog.omochiisidiot.net/` → 今まで通り動く！

### 新しい記事を追加

1. `https://blog.omochiisidiot.net/admin.html`にアクセス
2. フォームに入力
3. 投稿ボタン
4. 即座に反映！🎉

### Vueコンポーネントは変更不要

`posts.json`と`.md`ファイルの代わりにAPIが返すから、**フロントエンドは何も変えなくてOK！**

---

## プロジェクト構造
```
cloudflaretunnel_vue/
├── wrangler.toml
├── schema.sql
├── public/
│   ├── admin.html           ← 新規作成（管理画面）
│   ├── _functions/          ← 新規作成
│   │   └── api/
│   │       ├── posts.json.js      ← posts.jsonの代わり
│   │       └── posts/
│   │           ├── [slug].md.js   ← .mdファイルの代わり
│   │           └── create.js      ← 記事作成API
│   └── posts/               ← 既存（削除してもOK）
│       ├── posts.json
│       └── *.md
└── src/
    └── ...
