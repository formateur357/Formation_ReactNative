import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppColors } from '../constants/colors';
import { MealSummary } from '../lib/mealTypes';

interface RecipeCardProps {
  meal: MealSummary;
  colors: AppColors;
  isFavorite: boolean;
  onPress: (meal: MealSummary) => void;
  onToggleFavorite: (meal: MealSummary) => void;
}

function RecipeCardComponent({
  meal,
  colors,
  isFavorite,
  onPress,
  onToggleFavorite
}: RecipeCardProps) {
  return (
    <Pressable
      onPress={() => onPress(meal)}
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      accessibilityRole="button"
      accessibilityLabel={`Ouvrir la recette ${meal.strMeal}`}
    >
      <Image
        source={{ uri: meal.strMealThumb }}
        style={styles.image}
        accessibilityLabel={`Image de ${meal.strMeal}`}
      />

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {meal.strMeal}
        </Text>
        <Text style={[styles.meta, { color: colors.textMuted }]} numberOfLines={1}>
          {[meal.strCategory, meal.strArea].filter(Boolean).join(' · ') || 'Recette'}
        </Text>
      </View>

      <Pressable
        onPress={() => onToggleFavorite(meal)}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        style={styles.favoriteButton}
      >
        <Text style={styles.favorite}>{isFavorite ? '★' : '☆'}</Text>
      </Pressable>
    </Pressable>
  );
}

export const RecipeCard = React.memo(RecipeCardComponent);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    minHeight: 102
  },
  image: {
    width: 102,
    height: 102,
    backgroundColor: '#fed7aa'
  },
  content: {
    flex: 1,
    padding: 12,
    gap: 6
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 21
  },
  meta: {
    fontSize: 13,
    fontWeight: '700'
  },
  favoriteButton: {
    paddingHorizontal: 14,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  favorite: {
    fontSize: 30,
    color: '#f59e0b'
  }
});
