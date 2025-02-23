import { removeSavedCourse } from '@/app/actions/collection';
import { NextRequest } from 'next/server';
 
export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const courseId = searchParams.get('id')
    if (!courseId) {
      return Response.error()
    }
    const data = await removeSavedCourse(courseId)
    return Response.json({ data });
  } catch (error) {
    console.error(error)
    return Response.error()
  }
}
