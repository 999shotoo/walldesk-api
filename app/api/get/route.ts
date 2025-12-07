import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaLibSql({ url: connectionString });
const prisma = new PrismaClient({ adapter });

export async function GET(request: Request) {

  const wallpaper = await prisma.wallpaper.findMany();

  return new Response(
    JSON.stringify(wallpaper),
    { status: 200 }
  );
}
