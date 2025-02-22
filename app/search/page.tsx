import { Box } from "@mui/material";
import SearchInput from "../components/search-input";
import { getAllCourses } from "../actions";
import CourseCard from "../components/course-card";

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
      <SearchInput />
      <Box>
        {courses.map(course => <CourseCard key={course.courseId} course={course} />)}
      </Box>
    </Box>
  )
}
