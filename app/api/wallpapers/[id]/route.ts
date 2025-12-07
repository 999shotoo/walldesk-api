import { NextResponse } from 'next/server';
import wallpapersData from '../../../../content/wallpaper.json';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const wallpapers = Array.isArray(wallpapersData) ? wallpapersData : [];
  const found = wallpapers.find((wp: any) => wp.id === id);
  return NextResponse.json(found || {});
}
