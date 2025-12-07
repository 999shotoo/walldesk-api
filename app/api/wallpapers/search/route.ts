import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').toLowerCase();
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '24');
  const chunkSize = 1000;
  const chunkDir = path.join(process.cwd(), 'content', 'wallpaper_chunks');
  const chunkFiles = fs.readdirSync(chunkDir).filter(f => f.endsWith('.json')).sort();
  let results: any[] = [];
  for (const file of chunkFiles) {
    const chunk = JSON.parse(fs.readFileSync(path.join(chunkDir, file), 'utf8'));
    results.push(...chunk);
  }
  if (q) {
    results = results.filter((wp: any) =>
      (wp.tags && wp.tags.some((t: string) => t.toLowerCase().includes(q))) ||
      (wp.author && wp.author.toLowerCase().includes(q)) ||
      (wp.category && wp.category.toLowerCase().includes(q))
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
