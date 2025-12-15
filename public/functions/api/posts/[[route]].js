// Cloudflare Workers 関数：D1 と連携する記事 API
export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)

  // CORS 設定
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    })
  }

  // 記事取得API
  if (url.pathname === '/api/posts' && request.method === 'GET') {
    try {
      const { results } = await env.DB.prepare('SELECT * FROM posts ORDER BY date DESC').all()
      return new Response(JSON.stringify(results), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  // 個別記事取得API
  if (url.pathname.startsWith('/api/posts/') && request.method === 'GET') {
    const slug = url.pathname.split('/').pop()
    try {
      const { results } = await env.DB.prepare('SELECT * FROM posts WHERE slug = ?')
        .bind(slug)
        .all()
      if (results.length === 0) {
        return new Response(JSON.stringify({ error: '記事が見つかりません' }), { status: 404 })
      }
      return new Response(JSON.stringify(results[0]), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
  }

  // 記事作成API
  if (url.pathname === '/api/posts/create' && request.method === 'POST') {
    try {
      const { title, date, content } = await request.json()

      if (!title || !date || !content) {
        return new Response(JSON.stringify({ error: 'タイトル、日付、本文は必須です' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      // slug を生成
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50)

      // D1 に挿入
      const result = await env.DB.prepare(
        'INSERT INTO posts (slug, title, date, content) VALUES (?, ?, ?, ?)',
      )
        .bind(slug, title, date, content)
        .run()

      return new Response(
        JSON.stringify({ id: result.meta.last_row_id, slug, message: '記事を投稿しました' }),
        {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        },
      )
    } catch (error) {
      console.error('Error creating post:', error)
      return new Response(JSON.stringify({ error: '投稿に失敗しました: ' + error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      })
    }
  }

  return new Response('Not Found', { status: 404, headers: corsHeaders })
}
