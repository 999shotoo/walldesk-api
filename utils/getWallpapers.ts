// Utility to load wallpapers.json (server-side)
import fs from 'fs';
import path from 'path';

export function getWallpapers() {
  const file = path.join(process.cwd(), 'scrapper', 'wallpapers.json');
  const data = fs.readFileSync(file, 'utf-8');
  return JSON.parse(data);
}
