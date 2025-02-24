import { Box } from "@mui/material";
import SearchInput from "@/app/components/search-input";
import { getAllCourses } from "@/app/actions/course";
import CourseCard from "@/app/components/course-card";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  // const text = (await searchParams).text as string
  const page = Number((await searchParams).page) || 0
  const initialValues = {
    text: (await searchParams).text as string,
    category: Number((await searchParams).category as string),
    deliveryMethod: Number((await searchParams).deliveryMethod as string),
    institute: Number((await searchParams).institute as string),
    language: Number((await searchParams).language as string),
    location: Number((await searchParams).location as string),
  }

  const courses = await getAllCourses(page)
  
  return (
    <Box sx={{ padding: '24px' }}>
      <SearchInput initialVals={initialValues} />
      <Box>
        {courses.map(course => <CourseCard key={course.courseId} course={course} />)}
      </Box>
    </Box>
  )
}
