import { Box } from "@mui/material";
import { getAllCourses } from "@/app/actions/course";
import CourseCard from "@/app/components/course-card";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const text = (await searchParams).text as string
  const page = Number((await searchParams).page) || 0

  console.log(text, page)
  const courses = await getAllCourses()
  console.log(courses)
  
  return (
    <Box sx={{ display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      padding: '24px'
    }}>
      <Box>
        
      </Box>
      <Box>
        {courses.map(course => <CourseCard key={course.courseId} course={course} />)}
      </Box>
    </Box>
  )
}
