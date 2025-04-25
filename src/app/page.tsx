import { graphqlClient } from "@/lib/graphqlClient";
import { GET_CHARACTERS } from "@/graphql/queries";
import { GetCharactersResponse } from "@/graphql/types";
import Image from "next/image";

export default async function HomePage() {
  const data = await graphqlClient.request<GetCharactersResponse>(GET_CHARACTERS, { page: 1 });
  const characters = data.characters.results;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {characters.map((char: any) => (
        <div key={char.id} className="text-center">
          <Image src={char.image} alt={char.name} width={128} height={128} className="mx-auto" />
          <h2 className="text-lg font-semibold">{char.name}</h2>
          <p className="text-gray-500">{char.species}</p>
        </div>
      ))}
    </div>
  );
}
