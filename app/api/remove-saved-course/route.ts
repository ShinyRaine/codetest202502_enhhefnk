import { removeSavedCourse } from '@/app/actions/collection';
import { NextRequest } from 'next/server';
 
export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const courseId = searchParams.get('id')
    if (!courseId) {
      return new Response(JSON.stringify({message: 'pramaters error'}), {status: 400})
    }
    const data = await removeSavedCourse(courseId)
    return Response.json({ data });
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({message: 'server error'}), {status: 500})
  }
}
