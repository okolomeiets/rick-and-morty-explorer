import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/favorites.json");

type Character = {
  id: string;
  name: string;
  image: string;
  species: string;
};

export async function GET() {
  const file = await fs.readFile(filePath, "utf-8");
  const favorites: Character[] = JSON.parse(file);
  return NextResponse.json(favorites);
}

export async function POST(req: Request) {
  const newFavorite: Character = await req.json();

  const file = await fs.readFile(filePath, "utf-8");
  const favorites: Character[] = JSON.parse(file);

  const exists = favorites.find((char) => char.id === newFavorite.id);
  if (exists) {
    return NextResponse.json({ message: "Already in favorites" }, { status: 409 });
  }

  const updated = [...favorites, newFavorite];
  await fs.writeFile(filePath, JSON.stringify(updated, null, 2), "utf-8");

  return NextResponse.json({ message: "Added to favorites" });
}
