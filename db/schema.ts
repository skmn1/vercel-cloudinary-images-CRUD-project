import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const images = sqliteTable('images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  display_name: text('display_name').notNull(),
  cloudinary_id: text('cloudinary_id').notNull(),
  created_at: text('created_at').default(sqliteNow()),
});

function sqliteNow() {
  // SQLite does not have a native timestamp type, so we use ISO string
  return new Date().toISOString();
}
