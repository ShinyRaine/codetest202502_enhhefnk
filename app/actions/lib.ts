function nulToUndefined(v: unknown){
  if(v === null) return undefined
  return v
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function covertToCourse(course: any) {
  return {
    courseId: course.courseId,
    courseName: course.courseName,
    startDate: course.startDate,
    institute: nulToUndefined(course.institute) as string,
    category: nulToUndefined(course.category) as string,
    location: nulToUndefined(course.location) as string,
    delivery: nulToUndefined(course.delivery) as string,
    isSaved: course.saveId !== null,
  }
}
