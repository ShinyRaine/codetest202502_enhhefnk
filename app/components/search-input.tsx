import { Box, Button, Input } from "@mui/material";
import Form from "next/form";


export default function SearchInput() {
  return (
    <Form action={"/search"}>
      <Box sx={{ display: 'flex', gap: '12px' }}>
        <Input placeholder="Search for Courses" name="text" />
        <Button variant="contained" type="submit">Search</Button>
      </Box>
    </Form>
  )
}
