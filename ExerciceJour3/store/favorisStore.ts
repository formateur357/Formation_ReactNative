import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { MealSummary } from '../lib/mealTypes';

interface FavorisState {
  favoris: MealSummary[];
  ajouterFavori: (meal: MealSummary) => void;
  retirerFavori: (idMeal: string) => void;
  toggleFavori: (meal: MealSummary) => void;
  estFavori: (idMeal: string) => boolean;
  viderFavoris: () => void;
}

const storage = new MMKV({ id: 'favoris-recettes-storage' });

const zustandStorage: StateStorage = {
  getItem: name => storage.getString(name) ?? null,
  setItem: (name, value) => storage.set(name, value),
  removeItem: name => storage.delete(name)
};

export const useFavorisStore = create<FavorisState>()(
  persist(
    (set, get) => ({
      favoris: [],

      ajouterFavori: meal => {
        if (get().estFavori(meal.idMeal)) return;
        set(state => ({ favoris: [meal, ...state.favoris] }));
      },

      retirerFavori: idMeal => {
        set(state => ({
          favoris: state.favoris.filter(meal => meal.idMeal !== idMeal)
        }));
      },

      toggleFavori: meal => {
        if (get().estFavori(meal.idMeal)) {
          get().retirerFavori(meal.idMeal);
          return;
        }

        get().ajouterFavori(meal);
      },

      estFavori: idMeal => {
        return get().favoris.some(meal => meal.idMeal === idMeal);
      },

      viderFavoris: () => set({ favoris: [] })
    }),
    {
      name: 'favoris-recettes-store',
      storage: createJSONStorage(() => zustandStorage)
    }
  )
);
