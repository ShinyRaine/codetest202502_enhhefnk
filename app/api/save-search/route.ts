import { saveSearch } from '@/app/actions/search';
import { NextRequest } from 'next/server';
 
export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const text = searchParams.get('text')
    if (!text) {
      return new Response(JSON.stringify({message: 'pramaters error'}), {status: 400})
    }
    await saveSearch(text)
    return Response.json({message: 'success'});
  } catch (error) {
    console.error(error)
    return Response.error()
  }
}
