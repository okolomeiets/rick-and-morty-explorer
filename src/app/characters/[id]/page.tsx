export const dynamic = "force-dynamic";

import { graphqlClient } from "@/lib/graphqlClient";
import { GET_CHARACTER } from "@/graphql/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { GetCharacterResponse } from "@/graphql/types";

type Props = {
  params: {
    id: string;
  };
};

export default async function CharacterDetailPage({ params }: Props) {
  const { id } = params;

  try {
    const res = await graphqlClient.request<GetCharacterResponse>(GET_CHARACTER, { id });
    const character = res.character;

    if (!character) return notFound();

    return (
      <main className="p-6 max-w-2xl mx-auto">
        <div className="flex flex-col items-center text-center mb-6">
          <Image
            src={character.image}
            alt={character.name}
            width={200}
            height={200}
            className="rounded-full mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{character.name}</h1>
          <p className="text-gray-600 mb-1">Status: {character.status}</p>
          <p className="text-gray-600 mb-1">Species: {character.species}</p>
          {character.type && <p className="text-gray-600 mb-1">Type: {character.type}</p>}
          <p className="text-gray-600 mb-1">Gender: {character.gender}</p>
          <p className="text-gray-600 mb-1">Origin: {character.origin.name}</p>
          <p className="text-gray-600">Last known location: {character.location.name}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Episodes</h2>
          <ul className="space-y-1">
            {character.episode.map((ep) => (
              <li key={ep.id} className="text-sm text-gray-700">
                <span className="font-medium">{ep.episode}</span>: {ep.name}{" "}
                <span className="text-gray-500">({ep.air_date})</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
  } catch {
    return notFound();
  }
}
