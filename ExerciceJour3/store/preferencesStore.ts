import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

export type ThemePreference = 'system' | 'light' | 'dark';

interface PreferencesState {
  theme: ThemePreference;
  notificationsEnabled: boolean;
  cookingReminderId: string | null;
  setTheme: (theme: ThemePreference) => void;
  toggleNotifications: () => void;
  setCookingReminderId: (id: string | null) => void;
  resetPreferences: () => void;
}

const storage = new MMKV({ id: 'preferences-storage' });

const zustandStorage: StateStorage = {
  getItem: name => storage.getString(name) ?? null,
  setItem: (name, value) => storage.set(name, value),
  removeItem: name => storage.delete(name)
};

const initialState = {
  theme: 'system' as ThemePreference,
  notificationsEnabled: false,
  cookingReminderId: null as string | null
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    set => ({
      ...initialState,
      setTheme: theme => set({ theme }),
      toggleNotifications: () =>
        set(state => ({ notificationsEnabled: !state.notificationsEnabled })),
      setCookingReminderId: cookingReminderId => set({ cookingReminderId }),
      resetPreferences: () => set(initialState)
    }),
    {
      name: 'preferences-store',
      storage: createJSONStorage(() => zustandStorage)
    }
  )
);
