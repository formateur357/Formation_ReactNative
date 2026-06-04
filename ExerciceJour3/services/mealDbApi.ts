import Constants from 'expo-constants';
import {
  CategoriesResponse,
  LookupMealResponse,
  MealCategory,
  MealDetail,
  MealSummary,
  SearchMealsResponse
} from '../lib/mealTypes';

const FALLBACK_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

function getBaseUrl() {
  return Constants.expoConfig?.extra?.apiUrl ?? FALLBACK_BASE_URL;
}

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${path}`);

  if (!response.ok) {
    throw new Error(`Erreur API HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function searchMeals(term: string): Promise<MealSummary[]> {
  const normalizedTerm = term.trim();

  if (!normalizedTerm) {
    return [];
  }

  const data = await requestJson<SearchMealsResponse>(
    `/search.php?s=${encodeURIComponent(normalizedTerm)}`
  );

  return data.meals ?? [];
}

export async function lookupMeal(id: string): Promise<MealDetail> {
  const data = await requestJson<LookupMealResponse>(
    `/lookup.php?i=${encodeURIComponent(id)}`
  );

  const meal = data.meals?.[0];

  if (!meal) {
    throw new Error('Recette introuvable');
  }

  return meal;
}

export async function getCategories(): Promise<MealCategory[]> {
  const data = await requestJson<CategoriesResponse>('/categories.php');
  return data.categories;
}
