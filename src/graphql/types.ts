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

export type GetCharacterResponse = {
  character: {
    id: string;
    name: string;
    image: string;
    species: string;
    status: string;
    type: string;
    gender: string;
    origin: { name: string };
    location: { name: string };
    episode: {
      id: string;
      name: string;
      episode: string;
      air_date: string;
    }[];
  };
};
