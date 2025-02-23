import { Box, Button, TextField } from "@mui/material";
import Form from 'next/form';

export default function ApplyForm({
  onSubmit
}: {
  onSubmit: (formData?: FormData) => Promise<void>;
}) {
  const handleSubmit = (formData: FormData) => {
    onSubmit(formData)
  }
  return (
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
  )
}
