import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
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
