'use client'

import { Box, Button, Input } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SearchInput() {
  const [text, setText] = useState('')
  const router = useRouter()
  return (
    <Box sx={{ display: 'flex', gap: '12px' }}>
      <Input placeholder="Search for Courses" onChange={e => setText(e.target.value)} />
      <Button variant="contained" onClick={() => router.push(`/search?text=${text}`)}>Search</Button>
    </Box>
  )
}
