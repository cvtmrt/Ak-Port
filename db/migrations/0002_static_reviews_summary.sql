DELETE FROM reviews WHERE source = 'google';

INSERT INTO settings (key, value, updated_at)
VALUES (
  'reviewsSummary',
  '{"average":5,"count":149,"source":"google"}'::jsonb,
  now()
)
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();
