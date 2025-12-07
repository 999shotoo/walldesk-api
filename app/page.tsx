
import { getWallpapers } from "../utils/getWallpapers";
import Image from "next/image";

export default function Home() {
  const wallpapers = getWallpapers();
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-zinc-50">Reddit Wallpapers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {wallpapers.map((wp: any) => (
          <div key={wp.id} className="bg-white dark:bg-zinc-900 rounded-lg shadow p-3 flex flex-col items-center">
            <a href={wp.image_url} target="_blank" rel="noopener noreferrer">
              <Image
                src={wp.preview?.url.replace(/&amp;/g, "&") || wp.image_url}
                alt={wp.title}
                width={400}
                height={225}
                className="rounded mb-2 object-cover"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </a>
            <div className="w-full">
              <div className="font-semibold text-base text-black dark:text-zinc-50 truncate" title={wp.title}>{wp.title}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">by {wp.author}</div>
              <div className="flex flex-wrap gap-2 items-center text-xs">
                <span className="bg-zinc-200 dark:bg-zinc-700 rounded px-2 py-0.5">{wp.width}x{wp.height}</span>
                {wp.aspect_ratio && <span className="bg-zinc-100 dark:bg-zinc-800 rounded px-2 py-0.5">AR: {wp.aspect_ratio}</span>}
                {wp.file_type && <span className="bg-zinc-100 dark:bg-zinc-800 rounded px-2 py-0.5">{wp.file_type.toUpperCase()}</span>}
                {wp.flair && <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded px-2 py-0.5">{wp.flair}</span>}
                {wp.color && <span className="rounded px-2 py-0.5" style={{ background: wp.color, color: '#fff' }}>Color</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
