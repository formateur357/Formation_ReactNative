import { useQuery } from '@tanstack/react-query';
import { getCategories, lookupMeal, searchMeals } from '../services/mealDbApi';

export function useMealSearch(term: string) {
  return useQuery({
    queryKey: ['meals', 'search', term],
    queryFn: () => searchMeals(term),
    enabled: term.trim().length > 0,
    staleTime: 5 * 60 * 1000
  });
}

export function useMealDetail(id: string | undefined) {
  return useQuery({
    queryKey: ['meals', 'detail', id],
    queryFn: () => lookupMeal(id as string),
    enabled: !!id,
    staleTime: 10 * 60 * 1000
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['meals', 'categories'],
    queryFn: getCategories,
    staleTime: 60 * 60 * 1000
  });
}
