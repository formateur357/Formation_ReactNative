import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemePreference = 'light' | 'dark' | 'auto';
export type LanguePreference = 'fr' | 'en' | 'es';
export type TaillePolicePreference = 'petite' | 'normale' | 'grande';

interface PreferencesState {
  theme: ThemePreference;
  langue: LanguePreference;
  notificationsActives: boolean;
  taillePolice: TaillePolicePreference;

  setTheme: (theme: ThemePreference) => void;
  setLangue: (langue: LanguePreference) => void;
  toggleNotifications: () => void;
  setTaillePolice: (taille: TaillePolicePreference) => void;
  resetPreferences: () => void;
}

const preferencesParDefaut = {
  theme: 'auto' as ThemePreference,
  langue: 'fr' as LanguePreference,
  notificationsActives: true,
  taillePolice: 'normale' as TaillePolicePreference,
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...preferencesParDefaut,

      setTheme: (theme) => set({ theme }),

      setLangue: (langue) => set({ langue }),

      toggleNotifications: () =>
        set((state) => ({
          notificationsActives: !state.notificationsActives,
        })),

      setTaillePolice: (taillePolice) => set({ taillePolice }),

      resetPreferences: () => set(preferencesParDefaut),
    }),
    {
      name: 'preferences-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);