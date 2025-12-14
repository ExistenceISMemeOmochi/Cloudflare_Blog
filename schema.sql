CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  tags TEXT,
  published INTEGER DEFAULT 1,
  views INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 初期データ
INSERT INTO posts (slug, title, content, date, tags) VALUES
('first-blog-post', 'Cloudflare TunnelでVueアプリを公開しました！', 'これは**最初のブログ記事**です...', '2025-12-14', 'Vue,Cloudflare'),
('vue-devtools-review', 'Vue Devtoolsが強すぎる件について', 'Vue Devtoolsの便利機能...', '2025-12-10', 'Vue');