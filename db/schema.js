// Drizzle ORM şeması — Railway PostgreSQL tabloları.
import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

// Blog yazıları — panel/CMS doldurur. content alanı HTML tutar.
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"), // kısa özet (liste + meta description)
  content: text("content"), // HTML gövde
  cover: text("cover"), // kapak görseli yolu
  author: text("author").notNull().default("AKÜPORT"),
  tags: text("tags").array(),
  published: boolean("published").notNull().default(true),
  publishedAt: text("published_at"), // "YYYY-MM-DD"
  createdAt: timestamp("created_at").defaultNow(),
});

// Yorumlar tablosu — panelde yönetilen ve sitede gösterilen onaylı yorumlar.
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(), // Google: author_name
  rating: integer("rating").notNull(), // 1-5
  text: text("text"), // yorum metni
  time: text("time"), // Google: relative_time_description ("2 hafta önce")
  avatar: text("avatar"), // Google: profile_photo_url (opsiyonel)
  source: text("source").notNull().default("google"), // google | manuel
  approved: boolean("approved").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  logo: text("logo"),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const districts = pgTable("districts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  intro: text("intro"),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contentPages = pgTable("content_pages", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  path: text("path").notNull().unique(),
  title: text("title"),
  subtitle: text("subtitle"),
  content: text("content"),
  data: jsonb("data").notNull().default({}),
  published: boolean("published").notNull().default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name"),
  mimeType: text("mime_type"),
  size: integer("size"),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
