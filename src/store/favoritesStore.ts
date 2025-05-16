import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Character = {
  id: string;
  name: string;
  image: string;
  species: string;
};

type FavoritesState = {
  favorites: Character[];
  hasLoaded: boolean;
  loadFavorites: () => Promise<void>;
  addFavorite: (char: Character) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
};

export const useFavoritesStore = create<FavoritesState>()(
  subscribeWithSelector((set, get) => ({
    favorites: [],
    hasLoaded: false,

    loadFavorites: async () => {
      if (get().hasLoaded) return;

      const res = await fetch("/api/favorites");
      const data = await res.json();

      set({ favorites: data, hasLoaded: true });
    },

    addFavorite: async (char) => {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(char),
      });

      if (res.ok) {
        set((state) => ({
          favorites: [...state.favorites, char],
        }));
      }
    },

    removeFavorite: async (id) => {
      const res = await fetch(`/api/favorites?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        set((state) => ({
          favorites: state.favorites.filter((char) => char.id !== id),
        }));
      }
    },
  })),
);
