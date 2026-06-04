# Correction — Projet final React Native : App Recettes

Correction complète de l'exercice final Jour 3 : application de recettes prête pour une préparation production.

## Fonctionnalités couvertes

- Recherche de recettes via TheMealDB avec debounce 300 ms.
- Favoris persistés avec MMKV.
- Détail recette avec ingrédients, instructions, bouton vidéo YouTube et partage natif.
- Notification locale programmable “Heure de cuisiner !”.
- Mode sombre complet : système / clair / sombre avec Zustand.
- Tests unitaires et d’intégration : utilitaires, hook debounce, composant RecipeCard.
- Configuration EAS Build / Submit / Update.

## API utilisée

```txt
https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}
https://www.themealdb.com/api/json/v1/1/categories.php
```

## Installation

```bash
npm install
npx expo start
```

MMKV est une bibliothèque native. Pour une vraie exécution mobile complète, utilisez un Development Build plutôt qu'Expo Go si votre version d'Expo Go ne contient pas ce module.

```bash
npx expo start --dev-client
```

## Tests

```bash
npm test
npm run test:coverage
npm run typecheck
```

## Build EAS

```bash
npx eas-cli@latest build:configure
npx eas-cli@latest build --platform android --profile preview
npx eas-cli@latest build --platform all --profile production
```

## OTA staging

```bash
npx eas-cli@latest update --channel staging --message "Correction projet final recettes"
```

## Architecture

```txt
app/
├── _layout.tsx
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx          # Recherche recettes
│   ├── favoris.tsx        # Favoris persistés MMKV
│   └── parametres.tsx     # Mode sombre + notification
└── recette/[id].tsx       # Fiche recette

components/
├── RecipeCard.tsx
├── IngredientList.tsx
├── SearchInput.tsx
└── StateView.tsx

hooks/
├── useAppTheme.ts
├── useDebounce.ts
└── useMeals.ts

lib/
├── mealTypes.ts
└── mealUtils.ts

services/
├── mealDbApi.ts
└── notifications.ts

store/
├── favorisStore.ts
└── preferencesStore.ts
```

## Remarques formateur

- La correction privilégie une architecture lisible pour formation.
- TheMealDB est une API publique ; le projet ne contient pas de clé privée.
- Les secrets ne doivent jamais être commités dans le code mobile.
- Pour une app production réelle, ajoutez monitoring, politique de confidentialité, captures stores et vraie stratégie d’erreurs.
