import { db } from '@/app/db'
import { applyedCourseTable, categoryTable, courseTable, deliveryTable, instituteTable, languageTable, locationTable } from '@/app/db/schema'
import { eq } from 'drizzle-orm'
import { covertToCourse } from './lib'

export async function insertAppliedCourse(courseId: string) {
  return await db.insert(applyedCourseTable).values({courseId}).execute()
}
export async function isCourseApplied(courseId: string) {
  const course = await db
  .select().from(applyedCourseTable)
  .where(eq(applyedCourseTable.courseId, courseId)).execute()

  return course.length !== 0
}
export async function getAppliedCourses() {
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
    }).from(applyedCourseTable)
    .where(eq(applyedCourseTable.courseId, courseTable.courseId))
    .leftJoin(courseTable, eq(applyedCourseTable.courseId, courseTable.courseId))
    .leftJoin(instituteTable, eq(courseTable.instituteId, instituteTable.id))
    .leftJoin(categoryTable, eq(courseTable.categoryId, categoryTable.id))
    .leftJoin(languageTable, eq(courseTable.languageId, languageTable.id))
    .leftJoin(locationTable, eq(courseTable.locationId, locationTable.id))
    .leftJoin(deliveryTable, eq(courseTable.deliveryId, deliveryTable.id))
    .groupBy(courseTable.courseId, instituteTable.id, categoryTable.id, languageTable.id, locationTable.id, deliveryTable.id)
    .execute()
  return list.map(covertToCourse)
}
