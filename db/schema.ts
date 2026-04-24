import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const photos = sqliteTable('photos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  cloudinary_id: text('cloudinary_id').notNull(),
  created_at: text('created_at').default(() => new Date().toISOString()),
});
