import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaLibSql({ url: connectionString });
const prisma = new PrismaClient({ adapter });

const seedWallpapers = async () => {
  const count = await prisma.wallpaper.count();
  if (count === 0) {
    await prisma.wallpaper.createMany({
      data: [
        {
          url: "https://example.com/wallpaper1.jpg",  
          author: "Author 1",
          source: "Source 1",
        },
        {
          url: "https://example.com/wallpaper2.jpg",  
          author: "Author 2",
          source: "Source 2",
        },
      ],
    });
    console.log("Seeded wallpapers data.");
  }
};

seedWallpapers()
