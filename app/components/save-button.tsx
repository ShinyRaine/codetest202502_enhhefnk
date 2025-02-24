'use client'

import { IconButton, Snackbar } from "@mui/material"
import { useState } from "react"
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
// import { removeSavedCourseReq, saveCourseReq } from "@/app/actions/collection"

export default function SaveButton(
  { initialStatus, courseId }:
  { initialStatus?: boolean
    courseId: string
  }
) {
  const [isSaved, setIsSaved] = useState(initialStatus || false)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [noticeMsg, setNoticeMsg] = useState('false')

  const handleToggleSave = async () => {
    try {
      const api = isSaved ? 'remove-saved-course' : 'save-course'
      await fetch(`/api/${api}?id=${courseId}`, {
        method: isSaved ? 'DELETE' : 'PUT'
      })
      setIsSaved(!isSaved)
      setNoticeMsg(isSaved ? 'remove succeed' : 'save succeed')
      setNoticeOpen(true)
    } catch (error) {
      console.error(error)
      setNoticeMsg('save failed')
      setNoticeOpen(true)
    }
  }
  return (
    <>
    <IconButton onClick={handleToggleSave}>
      {isSaved ? <StarIcon color="primary" /> : <StarOutlineIcon />}
    </IconButton>
    <Snackbar
      open={noticeOpen}
      autoHideDuration={3000}
      onClose={() => setNoticeOpen(false)}
      message={noticeMsg}
    />
    </>
  );
}
