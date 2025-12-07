// Utility to load wallpapers.json (server-side)

import fs from 'fs';
import path from 'path';

// Loads all wallpaper chunks and combines them into a single array
export function getWallpapers() {
  const chunkDir = path.join(process.cwd(), 'content', 'wallpaper_chunks');
  if (!fs.existsSync(chunkDir)) return [];
  const chunkFiles = fs.readdirSync(chunkDir).filter(f => f.endsWith('.json')).sort();
  let wallpapers = [];
  for (const file of chunkFiles) {
    const chunk = JSON.parse(fs.readFileSync(path.join(chunkDir, file), 'utf8'));
    wallpapers.push(...chunk);
  }
  return wallpapers;
}
