'use server'
import { db } from '@/app/db'
import { categoryTable, courseTable, deliveryTable, instituteTable, languageTable, locationTable, savedCourseTable } from '@/app/db/schema'
import { and, asc, eq, sql } from 'drizzle-orm'
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

export async function searchCourses({
  text,
  category,
  deliveryMethod,
  institute,
  language,
  location,
  page,
  pageSize = 10
} : {
  text: string,
  category?: number,
  deliveryMethod?: number,
  institute?: number,
  language?: number,
  location?: number,
  page: number,
  pageSize?: number
}) {

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
    .where(
      and(
        text ? sql`to_tsvector(${courseTable.courseName}) @@ to_tsquery(${text})` : undefined,
        institute ? eq(courseTable.instituteId, institute) : undefined,
        category ? eq(courseTable.categoryId, category) : undefined,
        deliveryMethod ? eq(courseTable.deliveryId, deliveryMethod) : undefined,
        language ? eq(courseTable.languageId, language) : undefined,
        location ? eq(courseTable.locationId, location) : undefined,
      )
    )
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

  const count = await db.$count(
    courseTable, and(
      text ? sql`to_tsvector(${courseTable.courseName}) @@ to_tsquery(${text})` : undefined,
      institute ? eq(courseTable.instituteId, institute) : undefined,
      category ? eq(courseTable.categoryId, category) : undefined,
      deliveryMethod ? eq(courseTable.deliveryId, deliveryMethod) : undefined,
      language ? eq(courseTable.languageId, language) : undefined,
      location ? eq(courseTable.locationId, location) : undefined,
    )
  )
  return {
    courses: courses.map(covertToCourse),
    total: count
  }
}
