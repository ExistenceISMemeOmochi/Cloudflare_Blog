-- テーブル作成
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

-- 既存データ（スラッグをUUID風に変更）
INSERT INTO posts (slug, title, content, date, tags) VALUES
('a1b2c3d4-e5f6-4789-abcd-ef0123456789', 'Cloudflare TunnelでVueアプリを公開しました！', 'これは**最初のブログ記事**です。[Vue.js](https://vuejs.org)とCloudflare Tunnelの組み合わせは非常に強力で、数分で外部に公開できました！', '2025-12-14', 'Vue,Cloudflare'),
('b2c3d4e5-f6a7-4890-bcde-f01234567890', 'Vue Devtoolsが強すぎる件について', 'Vue Devtoolsの便利機能について...', '2025-12-10', 'Vue');