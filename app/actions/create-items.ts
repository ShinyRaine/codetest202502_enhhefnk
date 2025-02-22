'use server'
import { db } from '@/app/db'
import { categoryTable, courseTable, deliveryTable, instituteTable, languageTable, locationTable } from '@/app/db/schema'
 
export async function createCategory(name: string) {
  await db.insert(categoryTable).values({name})
}

export async function createDelivery(name: string) {
  await db.insert(deliveryTable).values({name})
}

export async function createInstitute(name: string) {
  await db.insert(instituteTable).values({name})
}

export async function createLanguage(name: string) {
  await db.insert(languageTable).values({name})
}

export async function createLocation(name: string) {
  await db.insert(locationTable).values({name})
}

export async function createCourse(course: {
  courseId: string,
  courseName: string,
  startDate: Date,
  instituteId: number,
  categoryId: number,
  languageId: number,
  locationId: number,
  deliveryId: number,
}) {
  await db.insert(courseTable).values(course)
}
