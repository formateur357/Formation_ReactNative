import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="preferences" options={{ title: 'Preferences' }} />
        <Stack.Screen name="taches" options={{ title: 'Tâches Redux' }} />
        <Stack.Screen name="compteur" options={{ title: 'Compteur' }} />
        <Stack.Screen name="minuteur" options={{ title: 'Minuteur' }} />
        <Stack.Screen name="galerie" options={{ title: 'Galerie' }} />
        <Stack.Screen name="panier" options={{ title: 'Panier' }} />
      </Stack>
    </Provider>
  );
}