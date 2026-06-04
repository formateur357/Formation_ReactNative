import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { RecipeCard } from '../../components/RecipeCard';
import { StateView } from '../../components/StateView';
import { useAppTheme } from '../../hooks/useAppTheme';
import { MealSummary } from '../../lib/mealTypes';
import { useFavorisStore } from '../../store/favorisStore';

export default function FavorisScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const [search, setSearch] = useState('');
  const favoris = useFavorisStore(state => state.favoris);
  const toggleFavori = useFavorisStore(state => state.toggleFavori);
  const estFavori = useFavorisStore(state => state.estFavori);

  const favorisFiltres = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return favoris;
    return favoris.filter(meal => meal.strMeal.toLowerCase().includes(term));
  }, [favoris, search]);

  const openMeal = useCallback(
    (meal: MealSummary) => {
      router.push({ pathname: '/recette/[id]', params: { id: meal.idMeal } });
    },
    [router]
  );

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}> 
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Favoris</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>Persistés avec MMKV et disponibles offline.</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Rechercher dans les favoris"
          placeholderTextColor={colors.textMuted}
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          accessibilityLabel="Recherche dans les favoris"
        />
      </View>

      <FlatList
        data={favorisFiltres}
        keyExtractor={item => item.idMeal}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <RecipeCard
            meal={item}
            colors={colors}
            isFavorite={estFavori(item.idMeal)}
            onPress={openMeal}
            onToggleFavorite={toggleFavori}
          />
        )}
        ListEmptyComponent={
          <StateView
            colors={colors}
            title="Aucun favori"
            message="Ajoute une recette avec l’étoile depuis l’onglet Recettes."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { padding: 16, gap: 10 },
  title: { fontSize: 30, fontWeight: '900' },
  subtitle: { fontSize: 14, fontWeight: '700', lineHeight: 20 },
  input: { borderWidth: 1, borderRadius: 16, padding: 14, fontSize: 16 },
  list: { paddingHorizontal: 16, paddingBottom: 28, gap: 12 }
});
