import { NextResponse } from 'next/server';
import wallpapersData from '../../../../content/wallpaper.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tags = searchParams.getAll('tags');
  let results = Array.isArray(wallpapersData) ? wallpapersData : [];
  if (tags && tags.length > 0) {
    results = results.filter((wp: any) =>
      wp.tags && tags.every((t: string) => wp.tags.includes(t))
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
