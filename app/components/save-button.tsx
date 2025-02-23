'use client'

import { IconButton } from "@mui/material"
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
  const handleToggleSave = async () => {
    try {
      const api = isSaved ? 'remove-saved-course' : 'save-course'
      await fetch(`/api/${api}?id=${courseId}`, {
        method: isSaved ? 'DELETE' : 'PUT'
      })
      setIsSaved(!isSaved)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <IconButton onClick={handleToggleSave}>
      {isSaved ? <StarIcon color="primary" /> : <StarOutlineIcon />}
    </IconButton>
  );
}
