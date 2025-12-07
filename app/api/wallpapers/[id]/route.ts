import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const chunkDir = path.join(process.cwd(), 'content', 'wallpaper_chunks');
  const chunkFiles = fs.readdirSync(chunkDir).filter(f => f.endsWith('.json')).sort();
  let found = null;
  for (const file of chunkFiles) {
    const chunk = JSON.parse(fs.readFileSync(path.join(chunkDir, file), 'utf8'));
    found = chunk.find((wp: any) => wp.id === id);
    if (found) break;
  }
  return NextResponse.json(found || {});
}
