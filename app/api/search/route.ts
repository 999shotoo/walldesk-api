

import { NextResponse } from 'next/server';

// @ts-ignore
import fs from 'fs';
import path from 'path';
import metaData from '../../../content/wallpaper_meta.json';




import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, pathname } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const tag = searchParams.get("tag");
  const tags = searchParams.getAll("tags");
  const sort = searchParams.get("sort") || "recent";
  const idMatch = /\/w\/(\w+)/.exec(pathname);
  const id = idMatch ? idMatch[1] : searchParams.get("id");

  // Load wallpapers from chunked files
  const chunkDir = path.join(process.cwd(), 'content', 'wallpaper_chunks');
  const chunkFiles = fs.readdirSync(chunkDir).filter((f: string) => f.endsWith('.json')).sort();
  let wallpapers: any[] = [];
  for (const file of chunkFiles) {
    const chunk = JSON.parse(fs.readFileSync(path.join(chunkDir, file), 'utf8'));
    wallpapers.push(...chunk);
  }

  // Get by id
  if (id) {
    const found = wallpapers.find((wp: any) => wp.id === id);
    return NextResponse.json(found || {});
  }

  // Search by query
  let results = wallpapers;
  if (q) {
    results = results.filter((wp: any) =>
      (wp.tags && wp.tags.some((t: string) => t.toLowerCase().includes(q))) ||
      (wp.author && wp.author.toLowerCase().includes(q)) ||
      (wp.category && wp.category.toLowerCase().includes(q))
    );
  }

  // Filter by tag or tags
  if (tag) {
    results = results.filter((wp: any) => wp.tags && wp.tags.includes(tag));
  }
  if (tags && tags.length > 0) {
    results = results.filter((wp: any) =>
      wp.tags && tags.every((t: string) => wp.tags.includes(t))
    );
  }

  // Sorting
  if (sort === "recent") {
    results = results.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } else if (sort === "hot") {
    results = results.sort((a: any, b: any) => (b.favorites || 0) - (a.favorites || 0));
  } else if (sort === "mostview") {
    results = results.sort((a: any, b: any) => (b.views || 0) - (a.views || 0));
  }

  // Meta info endpoint
  if (searchParams.get("meta")) {
    return NextResponse.json(metaData);
  }

  // Like by tag (wallpapers with similar tags)
  if (searchParams.get("like")) {
    const likeTag = searchParams.get("like");
    results = results.filter((wp: any) => wp.tags && wp.tags.includes(likeTag));
  }

  // Pagination
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("perPage") || "24");
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

