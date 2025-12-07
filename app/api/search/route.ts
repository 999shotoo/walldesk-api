

import { NextResponse } from 'next/server';

// @ts-ignore
import episodesData from '../../../content/episodes.json';


export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").toLowerCase();

  // episodes.json has an 'episodes' array
  const episodes = (episodesData as any).episodes || [];

  // Filter episodes by query in title or author
  const filtered = episodes.filter((ep: any) =>
    ep.title?.toLowerCase().includes(query) ||
    ep.author?.toLowerCase().includes(query)
  );

  return NextResponse.json(filtered);
}

