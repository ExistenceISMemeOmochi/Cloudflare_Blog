export async function onRequest(context) {
  const { DB } = context.env
  const { slug } = context.params

  try {
    const post = await DB.prepare('SELECT content FROM posts WHERE slug = ? AND published = 1')
      .bind(slug)
      .first()

    if (!post) {
      return new Response('Not Found', { status: 404 })
    }

    // 閲覧数カウントアップ
    await DB.prepare('UPDATE posts SET views = views + 1 WHERE slug = ?').bind(slug).run()

    // Markdownとして返す
    return new Response(post.content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response('Error', { status: 500 })
  }
}
