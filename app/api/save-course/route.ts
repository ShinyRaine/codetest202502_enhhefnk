import { saveCourse } from '@/app/actions/collection';
import { NextRequest } from 'next/server';
 
export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const courseId = searchParams.get('id')
    if (!courseId) {
      return Response.error()
    }
    const data = await saveCourse(courseId)
    return Response.json({ data });
  } catch (error) {
    console.error(error)
    return Response.error()
  }
}
