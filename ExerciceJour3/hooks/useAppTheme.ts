import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from '../constants/colors';
import { usePreferencesStore } from '../store/preferencesStore';

export function useAppTheme() {
  const systemScheme = useColorScheme();
  const themePreference = usePreferencesStore(state => state.theme);

  const isDark =
    themePreference === 'dark' ||
    (themePreference === 'system' && systemScheme === 'dark');

  return {
    isDark,
    colors: isDark ? darkColors : lightColors,
    themePreference
  };
}
