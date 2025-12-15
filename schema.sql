-- 記事テーブル
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- 初期データ
INSERT OR IGNORE INTO posts (id, slug, title, date, content) VALUES
(1, 'first-blog-post', 'Cloudflare TunnelでVueアプリを公開しました！', '2025-12-14', 'これは**最初のブログ記事**です。[Vue.js](https://vuejs.org)とCloudflare Tunnelの組み合わせは非常に強力で、数分で外部に公開できました！'),
(2, 'vue-devtools-review', 'Vue Devtoolsが強すぎる件について', '2025-12-10', 'Vue Devtoolsの機能は想像以上に充実しており、**データバインディング**の確認やリアルタイム編集が可能です。開発効率が劇的に上がりました。');