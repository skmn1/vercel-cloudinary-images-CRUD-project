"use server";

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { photos } from '../../db/schema';

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const db = drizzle(client);

export async function createPhoto({ title, cloudinary_id }: { title: string; cloudinary_id: string }) {
  const created_at = new Date().toISOString();
  await db.insert(photos).values({ title, cloudinary_id, created_at });
}
