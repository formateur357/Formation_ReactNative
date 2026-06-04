import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { RecipeCard } from '../../components/RecipeCard';
import { SearchInput } from '../../components/SearchInput';
import { StateView } from '../../components/StateView';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useDebounce } from '../../hooks/useDebounce';
import { useMealSearch } from '../../hooks/useMeals';
import { MealSummary } from '../../lib/mealTypes';
import { normalizeSearchTerm } from '../../lib/mealUtils';
import { useFavorisStore } from '../../store/favorisStore';

export default function RecipesScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const [search, setSearch] = useState('chicken');
  const debouncedSearch = useDebounce(normalizeSearchTerm(search), 300);
  const query = useMealSearch(debouncedSearch);
  const toggleFavori = useFavorisStore(state => state.toggleFavori);
  const estFavori = useFavorisStore(state => state.estFavori);

  const openMeal = useCallback(
    (meal: MealSummary) => {
      router.push({ pathname: '/recette/[id]', params: { id: meal.idMeal } });
    },
    [router]
  );

  const renderMeal = useCallback(
    ({ item }: { item: MealSummary }) => (
      <RecipeCard
        meal={item}
        colors={colors}
        isFavorite={estFavori(item.idMeal)}
        onPress={openMeal}
        onToggleFavorite={toggleFavori}
      />
    ),
    [colors, estFavori, openMeal, toggleFavori]
  );

  const meals = query.data ?? [];

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}> 
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Trouver une recette</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>Recherche TheMealDB avec debounce 300 ms.</Text>
        <SearchInput value={search} onChangeText={setSearch} colors={colors} />
      </View>

      {query.isLoading && (
        <StateView colors={colors} title="Chargement..." message="Recherche des recettes en cours." loading />
      )}

      {query.isError && (
        <StateView
          colors={colors}
          title="Erreur de chargement"
          message={query.error instanceof Error ? query.error.message : 'Erreur inconnue'}
          actionLabel="Réessayer"
          onAction={() => query.refetch()}
        />
      )}

      {!query.isLoading && !query.isError && (
        <FlatList
          data={meals}
          keyExtractor={item => item.idMeal}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={query.isRefetching} onRefresh={query.refetch} />}
          renderItem={renderMeal}
          ListEmptyComponent={
            <StateView
              colors={colors}
              title="Aucune recette"
              message="Essaie un autre mot-clé : pasta, beef, salad, rice..."
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { padding: 16, gap: 10 },
  title: { fontSize: 30, fontWeight: '900' },
  subtitle: { fontSize: 14, fontWeight: '700', lineHeight: 20 },
  list: { paddingHorizontal: 16, paddingBottom: 28, gap: 12 }
});
