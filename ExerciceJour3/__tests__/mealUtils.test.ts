import { buildShareMessage, formatIngredients, normalizeSearchTerm, toMealSummary } from '../lib/mealUtils';
import { MealDetail } from '../lib/mealTypes';

const meal: MealDetail = {
  idMeal: '52772',
  strMeal: 'Chicken Handi',
  strMealThumb: 'https://example.com/chicken.jpg',
  strCategory: 'Chicken',
  strArea: 'Indian',
  strInstructions: 'Cook slowly.',
  strYoutube: 'https://youtube.com/watch?v=test',
  strTags: null,
  strSource: null,
  strIngredient1: 'Chicken',
  strMeasure1: '1 kg',
  strIngredient2: 'Onion',
  strMeasure2: '2',
  strIngredient3: '',
  strMeasure3: ''
};

describe('mealUtils', () => {
  it('normalise le terme de recherche', () => {
    expect(normalizeSearchTerm('  CHICKEN  ')).toBe('chicken');
  });

  it('extrait les ingrédients renseignés', () => {
    expect(formatIngredients(meal)).toEqual([
      { ingredient: 'Chicken', measure: '1 kg' },
      { ingredient: 'Onion', measure: '2' }
    ]);
  });

  it('convertit un détail en résumé favori', () => {
    expect(toMealSummary(meal)).toEqual({
      idMeal: '52772',
      strMeal: 'Chicken Handi',
      strMealThumb: 'https://example.com/chicken.jpg',
      strCategory: 'Chicken',
      strArea: 'Indian'
    });
  });

  it('construit un message de partage avec la vidéo', () => {
    expect(buildShareMessage(meal)).toContain('Chicken Handi');
    expect(buildShareMessage(meal)).toContain('https://youtube.com/watch?v=test');
  });
});
