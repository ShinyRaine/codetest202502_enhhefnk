import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import SaveButton from "./save-button";

export default function CourseCard(
  { course, type }:
  { course: {
      courseId: string,
      courseName: string,
      startDate: Date,
      language?: string,
      category?: string,
      institute?: string,
      location?: string,
      delivery?: string,
      isSaved?: boolean
    },
    type?: string
  }
) {
  return (
    <Card key={course.courseId} sx={{ margin: '12px'}}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', gap: '12px'}}>
        <Box>
          <Typography variant="h5">{course.courseName}</Typography>
          <Typography variant="body2">{course.category}</Typography>
          <Typography variant="body2">{course.institute} Location: {course.location}</Typography>
          <Typography variant="body2">Start Time: {course.startDate.toLocaleDateString()}</Typography>
        </Box>
        <Box sx={{ textAlign: 'right'}}>
          <SaveButton courseId={course.courseId} initialStatus={course.isSaved} />
          <Typography variant="body2">{course.delivery}</Typography>
          <Typography variant="body2">{course.language}</Typography>
        </Box>
      </CardContent>
      {type !== 'display'
      ? <CardActions sx={{ justifyContent: 'right'}}><Link href={`/apply?id=${course.courseId}`}><Button variant="contained">Apply</Button></Link></CardActions>
      : null}
    </Card>
  );
}
