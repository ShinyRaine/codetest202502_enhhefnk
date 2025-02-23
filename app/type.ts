export interface Course {
  courseId: string,
  courseName: string,
  startDate: Date,
  institute?: string,
  category?: string,
  location?: string,
  delivery?: string,
  isSaved?: boolean,
}
