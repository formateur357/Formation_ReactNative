import { fireEvent, render } from '@testing-library/react-native';
import { lightColors } from '../constants/colors';
import { RecipeCard } from '../components/RecipeCard';
import { MealSummary } from '../lib/mealTypes';

const meal: MealSummary = {
  idMeal: '52772',
  strMeal: 'Chicken Handi',
  strMealThumb: 'https://example.com/chicken.jpg',
  strCategory: 'Chicken',
  strArea: 'Indian'
};

describe('RecipeCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('affiche le nom et les métadonnées de la recette', () => {
    const screen = render(
      <RecipeCard
        meal={meal}
        colors={lightColors}
        isFavorite={false}
        onPress={jest.fn()}
        onToggleFavorite={jest.fn()}
      />
    );

    expect(screen.getByText('Chicken Handi')).toBeTruthy();
    expect(screen.getByText('Chicken · Indian')).toBeTruthy();
  });

  it('appelle onPress avec la recette', () => {
    const onPress = jest.fn();

    const screen = render(
      <RecipeCard
        meal={meal}
        colors={lightColors}
        isFavorite={false}
        onPress={onPress}
        onToggleFavorite={jest.fn()}
      />
    );

    fireEvent.press(screen.getByLabelText('Ouvrir la recette Chicken Handi'));

    expect(onPress).toHaveBeenCalledWith(meal);
  });

  it('appelle onToggleFavorite au press de l’étoile', () => {
    const onToggleFavorite = jest.fn();

    const screen = render(
      <RecipeCard
        meal={meal}
        colors={lightColors}
        isFavorite={false}
        onPress={jest.fn()}
        onToggleFavorite={onToggleFavorite}
      />
    );

    fireEvent.press(screen.getByLabelText('Ajouter aux favoris'));

    expect(onToggleFavorite).toHaveBeenCalledWith(meal);
  });

  it('affiche le bon label favori quand la recette est déjà favorite', () => {
    const screen = render(
      <RecipeCard
        meal={meal}
        colors={lightColors}
        isFavorite
        onPress={jest.fn()}
        onToggleFavorite={jest.fn()}
      />
    );

    expect(screen.getByLabelText('Retirer des favoris')).toBeTruthy();
  });
});
