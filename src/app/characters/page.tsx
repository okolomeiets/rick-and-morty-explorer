import { graphqlClient } from "@/lib/graphqlClient";
import { GET_CHARACTERS } from "@/graphql/queries";
import { GetCharactersResponse } from "@/graphql/types";
import CharacterCard from "@/components/CharacterCard";
import { redirect } from "next/navigation";
import Pagination from "@/components/Pagination";
// Mock data when API is down
// import { mockCharacters } from "@/mocks/mockCharacters";

type Props = {
  searchParams: { page?: string };
};

export default async function CharactersPage({ searchParams }: Props) {
  // const characters = mockCharacters;
  const page = Number(searchParams.page) || 1;

  if (page < 1) redirect("/characters?page=1");

  const res = await graphqlClient.request<GetCharactersResponse>(GET_CHARACTERS, {
    page,
  });
  const characterList = res.characters?.results ?? [];
  const hasNextPage = res.characters?.info.next !== 0;
  const totalPages = res.characters.info.pages;

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-6 text-grey-300">Characters</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characterList.map((char) => (
          <CharacterCard key={char.id} {...char} />
        ))}
      </div>
      <Pagination currentPage={page} hasNextPage={hasNextPage} totalPages={totalPages} />
    </main>
  );
}
