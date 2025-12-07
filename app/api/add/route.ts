import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaLibSql({ url: connectionString });
const prisma = new PrismaClient({ adapter });


export async function POST(request: Request) {
 const { searchParams } = new URL(request.url);
 const url = searchParams.get("url") || "";
 const author = searchParams.get("author") || "Unknown";
 const source = searchParams.get("source") || "Unknown";
  const wallpaper = await prisma.wallpaper.create({
    data: {
      url,
      author,
      source,
    },
  });
  return new Response(
    JSON.stringify(wallpaper),
    { status: 201 }
  );
}
