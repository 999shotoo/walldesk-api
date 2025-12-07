import { NextResponse } from 'next/server';
import metaData from '../../../../content/wallpaper_meta.json';

export async function GET() {
  return NextResponse.json(metaData);
}
