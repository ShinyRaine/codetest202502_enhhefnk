import { Box, Typography } from "@mui/material";
import { getAppliedCourses } from "@/app/actions/course";
import CourseCard from "../components/course-card";

export default async function MyPage() {
  const courses = await getAppliedCourses()
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
