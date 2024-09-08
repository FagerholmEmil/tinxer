import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic');
  
  const arxivUrl = `http://export.arxiv.org/api/query?search_query=all:${topic}`;
  
  try {
    const response = await fetch(arxivUrl);
    const data = await response.text();
    return new NextResponse(data, {
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    console.error('Error fetching arXiv data:', error);
    return new NextResponse('Error fetching arXiv data', { status: 500 });
  }
}
