'use server'
import { db } from '@/app/db'
import { searchTable } from "@/app/db/schema"
import { eq } from 'drizzle-orm'

export async function saveSearch(text: string) {
  return await db.insert(searchTable).values({text}).execute()
}

export async function removeSavedSearch(id: number) {
  return await db.delete(searchTable).where(eq(searchTable.id, id)).execute()
}
