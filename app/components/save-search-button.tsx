'use client'

import { Button, Snackbar } from "@mui/material"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SaveSearchButton() {
  const search = useSearchParams()
  const newSearch = new URLSearchParams(search.toString())

  const [noticeOpen, setNoticeOpen] = useState(false)
  const [noticeMsg, setNoticeMsg] = useState('false')

  if(search.has('page')) {
    newSearch.delete('page')
  }
  const handleSave = () => {
    try {
      fetch(`/api/save-search?text=${encodeURIComponent(newSearch.toString())}`, {
        method: 'PUT'
      })
      setNoticeMsg('save succeed')
      setNoticeOpen(true)
    } catch (error) {
      console.error(error)
      setNoticeMsg('save failed')
      setNoticeOpen(true)
    }
    
  }
  return <>
    <Button variant="outlined" onClick={handleSave}>Save</Button>
    <Snackbar
      open={noticeOpen}
      autoHideDuration={3000}
      onClose={() => setNoticeOpen(false)}
      message={noticeMsg}
    />
  </>
}
