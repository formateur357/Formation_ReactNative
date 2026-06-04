export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string | null;
  strArea?: string | null;
}

export interface MealCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealDetail extends MealSummary {
  strInstructions: string | null;
  strYoutube: string | null;
  strTags: string | null;
  strSource: string | null;
  [key: `strIngredient${number}`]: string | null | undefined;
  [key: `strMeasure${number}`]: string | null | undefined;
}

export interface IngredientLine {
  ingredient: string;
  measure: string;
}

export interface SearchMealsResponse {
  meals: MealSummary[] | null;
}

export interface LookupMealResponse {
  meals: MealDetail[] | null;
}

export interface CategoriesResponse {
  categories: MealCategory[];
}
