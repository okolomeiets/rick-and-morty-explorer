export type Character = {
  id: string;
  name: string;
  image: string;
  species: string;
};

export type PageInfo = {
  pages: number;
  next: number | null;
  prev: number | null;
  count: number;
};

export type GetCharactersResponse = {
  characters: {
    info: PageInfo;
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
