'use server'
import { db } from '@/app/db'
import { categoryTable, courseTable, deliveryTable, instituteTable, languageTable, locationTable, savedCourseTable } from '@/app/db/schema'
import { asc, eq } from 'drizzle-orm'
import { covertToCourse } from './lib'

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
export async function getAllCourses(page: number, pageSize: number = 10) {

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
      saveId: savedCourseTable.id,
    }).from(courseTable)
    .leftJoin(instituteTable, eq(courseTable.instituteId, instituteTable.id))
    .leftJoin(categoryTable, eq(courseTable.categoryId, categoryTable.id))
    .leftJoin(languageTable, eq(courseTable.languageId, languageTable.id))
    .leftJoin(locationTable, eq(courseTable.locationId, locationTable.id))
    .leftJoin(deliveryTable, eq(courseTable.deliveryId, deliveryTable.id))
    .leftJoin(savedCourseTable, eq(savedCourseTable.courseId, courseTable.courseId))
    .groupBy(courseTable.courseId, instituteTable.id, categoryTable.id, languageTable.id, locationTable.id, deliveryTable.id, savedCourseTable.id)
    .orderBy(asc(courseTable.courseId)) // order by first_name (non-unique), id (pk)
    .limit(pageSize) 
    .offset(page * pageSize)
    .execute()

  return courses.map(covertToCourse)
}

export async function getCourseById(courseId: string) {
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
      saveId: savedCourseTable.id,
    }).from(courseTable)
    .where(eq(courseTable.courseId, courseId))
    .leftJoin(instituteTable, eq(courseTable.instituteId, instituteTable.id))
    .leftJoin(categoryTable, eq(courseTable.categoryId, categoryTable.id))
    .leftJoin(languageTable, eq(courseTable.languageId, languageTable.id))
    .leftJoin(locationTable, eq(courseTable.locationId, locationTable.id))
    .leftJoin(deliveryTable, eq(courseTable.deliveryId, deliveryTable.id))
    .leftJoin(savedCourseTable, eq(savedCourseTable.courseId, courseTable.courseId))
    .groupBy(courseTable.courseId, instituteTable.id, categoryTable.id, languageTable.id, locationTable.id, deliveryTable.id, savedCourseTable.id)
    .execute())[0]

  return covertToCourse(course)
}
