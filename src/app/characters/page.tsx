// import { graphqlClient } from "@/lib/graphqlClient";
// import { GET_CHARACTERS } from "@/graphql/queries";
// import { GetCharactersResponse } from "@/graphql/types";
import { mockCharacters } from "@/mocks/mockCharacters";
import CharacterCard from "@/components/CharacterCard";

export default async function CharactersPage() {
  // const data = await graphqlClient.request<GetCharactersResponse>(GET_CHARACTERS, { page: 1 });
  // const characters = data.characters.results;

  const characters = mockCharacters;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Characters</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((char) => (
          <CharacterCard key={char.id} {...char} />
        ))}
      </div>
    </main>
  );
}
