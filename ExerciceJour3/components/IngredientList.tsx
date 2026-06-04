import { StyleSheet, Text, View } from 'react-native';
import { AppColors } from '../constants/colors';
import { IngredientLine } from '../lib/mealTypes';

interface IngredientListProps {
  ingredients: IngredientLine[];
  colors: AppColors;
}

export function IngredientList({ ingredients, colors }: IngredientListProps) {
  if (ingredients.length === 0) {
    return <Text style={{ color: colors.textMuted }}>Aucun ingrédient renseigné.</Text>;
  }

  return (
    <View style={styles.container}>
      {ingredients.map(item => (
        <View key={`${item.ingredient}-${item.measure}`} style={styles.row}>
          <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
          <Text style={[styles.text, { color: colors.text }]}>
            {item.ingredient}
            {item.measure ? <Text style={{ color: colors.textMuted }}> — {item.measure}</Text> : null}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start'
  },
  bullet: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '900'
  },
  text: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22
  }
});
