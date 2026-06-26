CREATE TABLE IF NOT EXISTS products (
  id serial PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  brand text NOT NULL,
  category text NOT NULL,
  technology text NOT NULL DEFAULT 'standart',
  amper integer NOT NULL,
  volt integer NOT NULL DEFAULT 12,
  cca integer,
  price numeric(10,2),
  stock boolean NOT NULL DEFAULT true,
  product_code text,
  image text,
  images text[],
  short_desc text,
  description text,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts (
  id serial PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  content text,
  cover text,
  author text NOT NULL DEFAULT 'AKÜPORT',
  tags text[],
  published boolean NOT NULL DEFAULT true,
  published_at text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reviews (
  id serial PRIMARY KEY,
  author text NOT NULL,
  rating integer NOT NULL,
  text text,
  time text,
  avatar text,
  source text NOT NULL DEFAULT 'google',
  approved boolean NOT NULL DEFAULT true,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS brands (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  logo text,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS categories (
  id serial PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  kind text NOT NULL DEFAULT 'category',
  icon text NOT NULL DEFAULT 'battery',
  intro text,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS districts (
  id serial PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  title text NOT NULL,
  intro text,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_pages (
  id text PRIMARY KEY,
  label text NOT NULL,
  path text NOT NULL UNIQUE,
  title text,
  subtitle text,
  content text,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  published boolean NOT NULL DEFAULT true,
  updated_at timestamp DEFAULT now(),
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS assets (
  id serial PRIMARY KEY,
  filename text NOT NULL,
  original_name text,
  mime_type text,
  size integer,
  url text NOT NULL,
  created_at timestamp DEFAULT now()
);
