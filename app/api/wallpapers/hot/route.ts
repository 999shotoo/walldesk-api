import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '24');
  const chunkDir = path.join(process.cwd(), 'content', 'wallpaper_chunks');
  const chunkFiles = fs.readdirSync(chunkDir).filter(f => f.endsWith('.json')).sort();
  let wallpapers: any[] = [];
  for (const file of chunkFiles) {
    const chunk = JSON.parse(fs.readFileSync(path.join(chunkDir, file), 'utf8'));
    wallpapers.push(...chunk);
  }
  wallpapers = wallpapers.sort((a: any, b: any) => (b.favorites || 0) - (a.favorites || 0));
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paged = wallpapers.slice(start, end);
  return NextResponse.json({
    total: wallpapers.length,
    page,
    perPage,
    wallpapers: paged,
  });
}
