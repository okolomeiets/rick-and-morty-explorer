export type Character = {
  id: string;
  name: string;
  image: string;
  species: string;
};

export type GetCharactersResponse = {
  characters: {
    results: Character[];
  };
};
