

import { NextResponse } from 'next/server';

// @ts-ignore
import races from '../../../content/races.json';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").toLowerCase();

  // Filter races by query in title or slug
  const filtered = (races as any[]).filter((race) =>
    race.title.toLowerCase().includes(query) ||
    race.slug.toLowerCase().includes(query)
  );

  return NextResponse.json(filtered);
}

