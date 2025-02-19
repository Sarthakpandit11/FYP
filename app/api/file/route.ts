import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || "";

  if(filename && request.body){
  // ⚠️ The below code is for App Router Route Handlers only
  const blob = await put(filename, request.body, {
    access: 'public',
  });
  return NextResponse.json(blob);
}{
    return NextResponse.json({message:"No Filename Detected"}); 
}
}

 
export const runtime = 'edge';
 
export async function GET(request: Request) {
  const { blobs } = await list();
  return Response.json(blobs);
}
