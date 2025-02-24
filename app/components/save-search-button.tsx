'use client'

import { Button } from "@mui/material"
import { useSearchParams } from "next/navigation"

export default function SaveSearchButton() {
  const search = useSearchParams()
  const newSearch = new URLSearchParams(search.toString())
  if(search.has('page')) {
    newSearch.delete('page')
  }
  const handleSave = () => {
    fetch(`/api/save-search?text=${encodeURIComponent(newSearch.toString())}`, {
      method: 'PUT'
    })
  }
  return <Button variant="outlined" onClick={handleSave}>Save</Button>
}
