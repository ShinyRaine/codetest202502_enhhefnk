import { Box, Typography } from "@mui/material";
import { getAllCourses } from "../actions";
import CourseCard from "../components/course-card";

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const page = Number((await searchParams).page) || 0
  console.log(page)
  const courses = await getAllCourses()
  
  return (
    <Box sx={{ display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      padding: '24px'
    }}>
      <Typography variant="h2">My Applications</Typography>
      <Box>
        {courses.map(course => <CourseCard key={course.courseId} course={course} type="display" />)}
      </Box>
    </Box>
  )
}
