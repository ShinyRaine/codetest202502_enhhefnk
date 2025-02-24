import { Box, Typography } from "@mui/material";
import { getSavedCourses } from "@/app/actions/collection";
import CourseCard from "@/app/components/course-card";
import Empty from "../components/empty";

export default async function SearchPage() {
  const courses = await getSavedCourses()

  if (courses.length === 0) {
    return <Empty />
  }
  return (
    <Box sx={{ padding: '24px' }}>
      <Typography variant="h2" sx={{textAlign: 'center',}}>Saved Courses</Typography>
      {courses.length === 0 && <Typography variant="h4" sx={{color: 'text.secondary'}}>No saved courses</Typography>}
      <Box sx={{mt: '24px'}}>
        {courses.map(course => <CourseCard key={course.courseId} course={course} />)}
      </Box>
    </Box>
  )
}
