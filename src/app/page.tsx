"use client";

import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "@/graphql/getCharacters";
import Image from "next/image";

interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
}

const a = "test";

export default function Home() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

  return (
    <main className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.characters.results.map((char: Character) => (
        <div key={char.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <Image
            src={char.image}
            alt={char.name}
            width={128}
            height={128}
            className="rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold">{char.name}</h2>
          <p className="text-gray-600">
            {char.species} — {char.status}
          </p>
        </div>
      ))}
    </main>
  );
}
