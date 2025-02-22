import { Box, Typography } from "@mui/material";
import { getAllCourses } from "../actions";
import CourseCard from "../components/course-card";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const page = Number((await searchParams).page) || 0

  const courses = await getAllCourses()
  console.log(courses)
  
  return (
    <Box sx={{ display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      padding: '24px'
    }}>
      <Typography variant="h2">Saved Courses</Typography>
      <Box>
        {courses.map(course => <CourseCard key={course.courseId} course={course} />)}
      </Box>
    </Box>
  )
}
