export async function onRequest(context) {
  const { DB } = context.env

  try {
    const { results } = await DB.prepare(
      'SELECT id, slug, title, date, tags FROM posts WHERE published = 1 ORDER BY date DESC',
    ).all()

    // 既存のフォーマットに合わせる
    const posts = results.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      date: post.date,
      file: `${post.slug}.md`, // 互換性のため
    }))

    return new Response(JSON.stringify(posts), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}
