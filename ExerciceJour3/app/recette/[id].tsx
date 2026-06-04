import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Image, Linking, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { IngredientList } from '../../components/IngredientList';
import { StateView } from '../../components/StateView';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useMealDetail } from '../../hooks/useMeals';
import { buildShareMessage, formatIngredients, toMealSummary } from '../../lib/mealUtils';
import { useFavorisStore } from '../../store/favorisStore';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useAppTheme();
  const query = useMealDetail(id);
  const toggleFavori = useFavorisStore(state => state.toggleFavori);
  const estFavori = useFavorisStore(state => state.estFavori);

  const ingredients = useMemo(() => {
    return query.data ? formatIngredients(query.data) : [];
  }, [query.data]);

  const shareRecipe = async () => {
    if (!query.data) return;
    await Share.share({ message: buildShareMessage(query.data) });
  };

  if (query.isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}> 
        <StateView colors={colors} title="Chargement..." message="Récupération de la recette." loading />
      </View>
    );
  }

  if (query.isError || !query.data) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}> 
        <StateView
          colors={colors}
          title="Recette introuvable"
          message={query.error instanceof Error ? query.error.message : 'Erreur inconnue'}
          actionLabel="Réessayer"
          onAction={() => query.refetch()}
        />
      </View>
    );
  }

  const meal = query.data;
  const favorite = estFavori(meal.idMeal);

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.hero} accessibilityLabel={`Image de ${meal.strMeal}`} />

      <View style={styles.titleRow}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: colors.text }]}>{meal.strMeal}</Text>
          <Text style={[styles.meta, { color: colors.textMuted }]}> {[meal.strCategory, meal.strArea].filter(Boolean).join(' · ')}</Text>
        </View>
        <Pressable
          onPress={() => toggleFavori(toMealSummary(meal))}
          accessibilityLabel={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          hitSlop={12}
        >
          <Text style={styles.favorite}>{favorite ? '★' : '☆'}</Text>
        </Pressable>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Ingrédients</Text>
        <IngredientList ingredients={ingredients} colors={colors} />
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Instructions</Text>
        <Text style={[styles.instructions, { color: colors.text }]}>{meal.strInstructions ?? 'Aucune instruction.'}</Text>
      </View>

      <View style={styles.actions}>
        {meal.strYoutube ? (
          <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => Linking.openURL(meal.strYoutube as string)}>
            <Text style={[styles.buttonText, { color: colors.primaryText }]}>Voir la vidéo YouTube</Text>
          </Pressable>
        ) : null}
        <Pressable style={[styles.buttonSecondary, { borderColor: colors.border, backgroundColor: colors.card }]} onPress={shareRecipe}>
          <Text style={[styles.buttonSecondaryText, { color: colors.text }]}>Partager la recette</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { flex: 1, justifyContent: 'center' },
  content: { paddingBottom: 32 },
  hero: { width: '100%', height: 280, backgroundColor: '#fed7aa' },
  titleRow: { flexDirection: 'row', padding: 16, gap: 12, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '900', lineHeight: 34 },
  meta: { marginTop: 6, fontWeight: '700' },
  favorite: { fontSize: 36, color: '#f59e0b' },
  card: { marginHorizontal: 16, marginBottom: 14, padding: 16, borderRadius: 18, borderWidth: 1, gap: 12 },
  sectionTitle: { fontSize: 20, fontWeight: '900' },
  instructions: { fontSize: 15, lineHeight: 24 },
  actions: { paddingHorizontal: 16, gap: 10 },
  button: { padding: 14, borderRadius: 14, alignItems: 'center' },
  buttonText: { fontWeight: '900' },
  buttonSecondary: { padding: 14, borderRadius: 14, alignItems: 'center', borderWidth: 1 },
  buttonSecondaryText: { fontWeight: '900' }
});
