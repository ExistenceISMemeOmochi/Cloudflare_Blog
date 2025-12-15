export async function onRequest(context) {
  // CORSヘッダー追加
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // OPTIONSリクエスト（CORS preflight）
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers })
  }

  // POSTリクエストのみ受け付ける
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers,
    })
  }

  // DBが存在するかチェック
  if (!context.env.DB) {
    return new Response(
      JSON.stringify({
        error: 'Database not configured',
        hint: 'D1データベースがバインドされていません',
      }),
      {
        status: 500,
        headers,
      },
    )
  }

  try {
    const data = await context.request.json()

    console.log('Received data:', data) // デバッグ用

    // バリデーション
    if (!data.title || !data.content || !data.date) {
      return new Response(
        JSON.stringify({
          error: '必須項目が不足しています',
          received: data,
        }),
        {
          status: 400,
          headers,
        },
      )
    }

    // slug自動生成（タイトルから）
    const slug = data.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50)

    console.log('Generated slug:', slug) // デバッグ用

    // DBに挿入
    const result = await context.env.DB.prepare(
      'INSERT INTO posts (slug, title, content, date) VALUES (?, ?, ?, ?)',
    )
      .bind(slug, data.title, data.content, data.date)
      .run()

    console.log('Insert result:', result) // デバッグ用

    return new Response(
      JSON.stringify({
        success: true,
        slug: slug,
        id: result.meta.last_row_id,
      }),
      {
        headers,
      },
    )
  } catch (error) {
    console.error('Error:', error) // デバッグ用

    return new Response(
      JSON.stringify({
        error: error.message,
        stack: error.stack,
      }),
      {
        status: 500,
        headers,
      },
    )
  }
}
