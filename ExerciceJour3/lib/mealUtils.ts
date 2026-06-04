import { IngredientLine, MealDetail, MealSummary } from './mealTypes';

export function normalizeSearchTerm(term: string): string {
  return term.trim().toLowerCase();
}

export function formatIngredients(meal: MealDetail): IngredientLine[] {
  const ingredients: IngredientLine[] = [];

  for (let index = 1; index <= 20; index += 1) {
    const ingredient = meal[`strIngredient${index}`]?.trim();
    const measure = meal[`strMeasure${index}`]?.trim();

    if (ingredient) {
      ingredients.push({ ingredient, measure: measure ?? '' });
    }
  }

  return ingredients;
}

export function toMealSummary(meal: MealDetail | MealSummary): MealSummary {
  return {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    strCategory: meal.strCategory ?? null,
    strArea: meal.strArea ?? null
  };
}

export function buildShareMessage(meal: MealDetail): string {
  const youtube = meal.strYoutube ? `\nVidéo : ${meal.strYoutube}` : '';
  return `Découvre cette recette : ${meal.strMeal}${youtube}`;
}
