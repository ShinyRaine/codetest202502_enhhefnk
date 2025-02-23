import { Box, Typography } from "@mui/material";
import { getAppliedCourses } from "@/app/actions/application";
import CourseCard from "../components/course-card";

export default async function MyPage() {
  const courses = await getAppliedCourses()
  return (
    <Box sx={{ padding: '24px'}}>
      <Typography variant="h2" sx={{ textAlign: 'center'}}>My Applications</Typography>
      <Box>
        {courses.map(course => <CourseCard key={course.courseId} course={course} type="display" />)}
      </Box>
    </Box>
  )
}
