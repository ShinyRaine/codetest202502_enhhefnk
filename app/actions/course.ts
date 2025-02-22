'use server'
import { db } from '@/app/db'
import { categoryTable, courseTable, deliveryTable, instituteTable, languageTable, locationTable } from '@/app/db/schema'
import { eq } from 'drizzle-orm'

export async function getAllCategories() {
  return await db.select().from(categoryTable).execute()
}
export async function getAllDeliveries() {
  return await db.select().from(deliveryTable).execute()
}
export async function getAllInstitutes() {
  return await db.select().from(instituteTable).execute()
}
export async function getAllLanguages() {
  return await db.select().from(languageTable).execute()
}
export async function getAllLocations() {
  return await db.select().from(locationTable).execute()
}
export async function getAllCourses() {

  const courses = await db
    .select({
      courseId: courseTable.courseId,
      courseName: courseTable.courseName,
      startDate: courseTable.startDate,
      institute: instituteTable.name,
      category: categoryTable.name,
      location: locationTable.name,
      delivery: deliveryTable.name,
      language: languageTable.name,
    }).from(courseTable)
    .leftJoin(instituteTable, eq(courseTable.instituteId, instituteTable.id))
    .leftJoin(categoryTable, eq(courseTable.categoryId, categoryTable.id))
    .leftJoin(languageTable, eq(courseTable.languageId, languageTable.id))
    .leftJoin(locationTable, eq(courseTable.locationId, locationTable.id))
    .leftJoin(deliveryTable, eq(courseTable.deliveryId, deliveryTable.id))
    .groupBy(courseTable.courseId, instituteTable.id, categoryTable.id, languageTable.id, locationTable.id, deliveryTable.id)
    .execute()

  return courses.map(covertToCourse)
}

function nulToUndefined(v: unknown){
  if(v === null) return undefined
  return v
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function covertToCourse(course: any) {
  return {
    courseId: course.courseId,
    courseName: course.courseName,
    startDate: course.startDate,
    institute: nulToUndefined(course.institute) as string,
    category: nulToUndefined(course.category) as string,
    location: nulToUndefined(course.location) as string,
    delivery: nulToUndefined(course.delivery) as string,
  }
}

export async function getCourse(courseId: string) {
  const course = (await db
    .select({
      courseId: courseTable.courseId,
      courseName: courseTable.courseName,
      startDate: courseTable.startDate,
      institute: instituteTable.name,
      category: categoryTable.name,
      location: locationTable.name,
      delivery: deliveryTable.name,
      language: languageTable.name,
    }).from(courseTable)
    .where(eq(courseTable.courseId, courseId))
    .leftJoin(instituteTable, eq(courseTable.instituteId, instituteTable.id))
    .leftJoin(categoryTable, eq(courseTable.categoryId, categoryTable.id))
    .leftJoin(languageTable, eq(courseTable.languageId, languageTable.id))
    .leftJoin(locationTable, eq(courseTable.locationId, locationTable.id))
    .leftJoin(deliveryTable, eq(courseTable.deliveryId, deliveryTable.id))
    .groupBy(courseTable.courseId, instituteTable.id, categoryTable.id, languageTable.id, locationTable.id, deliveryTable.id)
    .execute())[0]

  return covertToCourse(course)
}
