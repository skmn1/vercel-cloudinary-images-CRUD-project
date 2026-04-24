"use server";

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { images } from '../../db/schema';
import { eq } from 'drizzle-orm';

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

export async function getImages() {
  return await db.select().from(images).orderBy(images.created_at.desc());
}

export async function addImage({ display_name, cloudinary_id }: { display_name: string; cloudinary_id: string }) {
  const created_at = new Date().toISOString();
  await db.insert(images).values({ display_name, cloudinary_id, created_at });
}

export async function updateImageName(id: number, display_name: string) {
  await db.update(images).set({ display_name }).where(eq(images.id, id));
}

export async function deleteImage(id: number) {
  await db.delete(images).where(eq(images.id, id));
}
