import { insertAppliedCourse, isCourseApplied } from "@/app/actions/application";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()
    const courseId = data.get('courseId') as string
    const name = data.get('name') as string
    const email = data.get('email') as string
    const phone = data.get('phone') as string
    const isApplied = await isCourseApplied(courseId)
    if (isApplied) {
      return new Response(JSON.stringify({message: 'course has been applied'}), {status: 400}) 
    }
    // send infomation
    console.log(courseId, name, email, phone)
    if(!courseId || !name || (!email && !phone)) {
      return new Response(JSON.stringify({message: 'pramaters error'}), {status: 400})
    }
    await insertAppliedCourse(courseId)
    return Response.json({ message: 'apply success' });
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({message: 'server error'}), {status: 500})
  }
}
