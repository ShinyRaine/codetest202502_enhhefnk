'use client'

import { Button } from "@mui/material"
import { useSearchParams } from "next/navigation"

export default function SaveSearchButton() {
  const search = useSearchParams().toString()
  const handleSave = () => {
    fetch(`/api/save-search?text=${encodeURIComponent(search)}`, {
      method: 'PUT'
    })
  }
  return <Button variant="outlined" onClick={handleSave}>Save</Button>
}
