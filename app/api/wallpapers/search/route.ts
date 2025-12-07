import { NextResponse } from 'next/server';
import wallpapersData from '../../../../content/wallpaper.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').toLowerCase();
  let results = Array.isArray(wallpapersData) ? wallpapersData : [];
  if (q) {
    results = results.filter((wp: any) =>
      (wp.tags && wp.tags.some((t: string) => t.toLowerCase().includes(q))) ||
      (wp.author && wp.author.toLowerCase().includes(q)) ||
      (wp.category && wp.category.toLowerCase().includes(q))
    );
  }
  // Pagination
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '24');
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
