'use server'
import { db } from '@/app/db'
import { categoryTable, courseTable, deliveryTable, instituteTable, languageTable, locationTable, savedCourseTable } from '@/app/db/schema'
import { eq } from 'drizzle-orm'
import { covertToCourse } from './lib'

export async function saveCourse(courseId: string) {
  return await db.insert(savedCourseTable).values({courseId}).execute()
}

export async function removeSavedCourse(courseId: string) {
  return await db.delete(savedCourseTable).where(eq(savedCourseTable.courseId, courseId)).execute()
}

export async function getSavedCourses() {
  const list = await db
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
    }).from(savedCourseTable)
    .leftJoin(courseTable, eq(savedCourseTable.courseId, courseTable.courseId))
    .leftJoin(instituteTable, eq(courseTable.instituteId, instituteTable.id))
    .leftJoin(categoryTable, eq(courseTable.categoryId, categoryTable.id))
    .leftJoin(languageTable, eq(courseTable.languageId, languageTable.id))
    .leftJoin(locationTable, eq(courseTable.locationId, locationTable.id))
    .leftJoin(deliveryTable, eq(courseTable.deliveryId, deliveryTable.id))
    .groupBy(courseTable.courseId, instituteTable.id, categoryTable.id, languageTable.id, locationTable.id, deliveryTable.id, savedCourseTable.id)
    .execute()
  return list.map(covertToCourse)
}
