import { NextResponse } from 'next/server';
import wallpapersData from '../../../../content/wallpaper.json';

export async function GET(request: Request) {
  let wallpapers = Array.isArray(wallpapersData) ? wallpapersData : [];
  wallpapers = wallpapers.sort((a: any, b: any) => (b.favorites || 0) - (a.favorites || 0));
  // Pagination
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '24');
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
