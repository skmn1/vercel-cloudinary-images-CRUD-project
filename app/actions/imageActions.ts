/// <reference types="node" />
"use server";

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { photos } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

export async function getImages() {
  return await db.select().from(photos).orderBy(desc(photos.created_at));
}

export async function addImage({ title, cloudinary_id }: { title: string; cloudinary_id: string }) {
  const created_at = new Date().toISOString();
  await db.insert(photos).values({ title, cloudinary_id, created_at });
}

export async function updateImageTitle(id: number, title: string) {
  await db.update(photos).set({ title }).where(eq(photos.id, id));
}

export async function deleteImage(id: number) {
  await db.delete(photos).where(eq(photos.id, id));
}
