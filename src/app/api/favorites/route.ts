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
  try {
    const file = await fs.readFile(filePath, "utf-8");
    const favorites: Character[] = JSON.parse(file);
    return NextResponse.json(favorites);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  const newFavorite: Character = await req.json();

  try {
    const file = await fs.readFile(filePath, "utf-8");
    const favorites: Character[] = JSON.parse(file);

    const exists = favorites.find((char) => char.id === newFavorite.id);
    if (exists) {
      return NextResponse.json({ message: "Already in favorites" }, { status: 409 });
    }

    const updated = [...favorites, newFavorite];
    await fs.writeFile(filePath, JSON.stringify(updated, null, 2), "utf-8");

    return NextResponse.json({ message: "Added to favorites" });
  } catch {
    return NextResponse.json({ message: "Error saving favorite" }, { status: 500 });
  }
}

// DELETE /api/favorites?id=123
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Missing ID" }, { status: 400 });
  }

  try {
    const file = await fs.readFile(filePath, "utf-8");
    const favorites: Character[] = JSON.parse(file);
    const updated = favorites.filter((char) => char.id !== id);

    await fs.writeFile(filePath, JSON.stringify(updated, null, 2), "utf-8");
    return NextResponse.json({ message: "Removed from favorites" });
  } catch {
    return NextResponse.json({ message: "Error removing favorite" }, { status: 500 });
  }
}
