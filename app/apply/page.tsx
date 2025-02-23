import { Box, Button, TextField, Typography } from "@mui/material";
import { getCourseById } from "@/app/actions/course";
import Form from 'next/form';

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const courseId = (await searchParams).id as string
  const course = await getCourseById(courseId)
  const handleSubmit = async (formData: FormData) => {
    'use server'
    console.log(formData)
  }
  return (
    <Box sx={{
      padding: '24px'
    }}>
      <Typography variant="h4" sx={{textAlign: 'center'}}>Apply {course.courseName}</Typography>
      <Form action={handleSubmit}>
        <Box sx={{
          mt: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <TextField name="name" label="Full Name" />
          <TextField name="email" label="Email" />
          <TextField name="phone" label="Phone" />

          <Button type="submit" variant="contained">Submit</Button>
        </Box>
        
      </Form>
    </Box>
  )
}
