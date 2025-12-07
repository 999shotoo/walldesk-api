import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tags = searchParams.getAll('tags');
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '24');
  const chunkDir = path.join(process.cwd(), 'content', 'wallpaper_chunks');
  const chunkFiles = fs.readdirSync(chunkDir).filter(f => f.endsWith('.json')).sort();
  let results: any[] = [];
  for (const file of chunkFiles) {
    const chunk = JSON.parse(fs.readFileSync(path.join(chunkDir, file), 'utf8'));
    results.push(...chunk);
  }
  if (tags && tags.length > 0) {
    results = results.filter((wp: any) =>
      wp.tags && tags.every((t: string) => wp.tags.includes(t))
    );
  }
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paged = results.slice(start, end);
  return NextResponse.json({
    total: results.length,
    page,
    perPage,
    wallpapers: paged,
  });
}
