CREATE TABLE IF NOT EXISTS waitlist (
  email TEXT PRIMARY KEY NOT NULL,
  created_at TEXT NOT NULL,
  consent_version TEXT NOT NULL,
  source TEXT NOT NULL
);
