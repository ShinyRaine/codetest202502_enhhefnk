'use client'
import { Button, CardActions, Dialog, DialogContent, Snackbar, Typography } from "@mui/material";
import { Course } from "../type";
import { useState } from "react";
import ApplyForm from "./apply-form";

export default function ApplyButton({
  course,
}: {
  course: Course,
}) {
  const [open, setOpen] = useState(false)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [noticeMsg, setNoticeMsg] = useState('false')

  const handleSubmit = async (formData?: FormData) => {
    if (formData) {
      try {
        formData.append('courseId', course.courseId)
        const res = await fetch('/api/apply', {
          method: 'POST',
          body: formData
        })
        if (res.status >= 400) {
          throw await res.json()
        }
        setNoticeMsg('apply succeed')
        setNoticeOpen(true)
        setOpen(false)
      } catch (error: unknown) {
        setNoticeMsg(error ? (error as { message: string }).message : 'save failed')
        setNoticeOpen(true)
        console.error(error)
      }
    } else {
      setOpen(false)
    }
  };
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <CardActions sx={{ justifyContent: 'right'}}>
        <Button variant="contained" onClick={handleOpen}>Apply</Button>
      </CardActions>
      <Dialog onClose={handleClose} open={open}>
        <DialogContent>
          <Typography variant="h4" sx={{textAlign: 'center'}}>Apply {course.courseName}</Typography>
          <ApplyForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
      <Snackbar
        open={noticeOpen}
        autoHideDuration={3000}
        onClose={() => setNoticeOpen(false)}
        message={noticeMsg}
      />
    </>
    
  )
}
