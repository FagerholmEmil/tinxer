import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'public', 'data.json');

async function readDataFile() {
  try {
    const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return { likedPdfs: [] };
  }
}

export async function GET() {
  const data = await readDataFile();
  return NextResponse.json(data.likedPdfs);
}

export async function POST(request: Request) {
  const { url } = await request.json();
  const data = await readDataFile();
  
  if (!data.likedPdfs.includes(url)) {
    data.likedPdfs.push(url);
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  }
  
  return NextResponse.json({ success: true });
}
