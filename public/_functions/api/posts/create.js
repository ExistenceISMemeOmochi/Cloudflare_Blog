export async function onRequest(context) {
  const { DB } = context.env

  // POSTリクエストのみ受け付ける
  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const data = await context.request.json()

    // バリデーション
    if (!data.title || !data.content || !data.date) {
      return new Response(JSON.stringify({ error: '必須項目が不足しています' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // UUID自動生成（crypto.randomUUID()を使用）
    const slug = crypto.randomUUID()

    // DBに挿入
    await DB.prepare('INSERT INTO posts (slug, title, content, date, tags) VALUES (?, ?, ?, ?, ?)')
      .bind(slug, data.title, data.content, data.date, data.tags || '')
      .run()

    return new Response(
      JSON.stringify({
        success: true,
        slug: slug, // 生成されたスラッグを返す
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
