import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export type Priorite = 'basse' | 'normale' | 'haute';

export interface Tache {
  id: string;
  titre: string;
  description: string;
  priorite: Priorite;
  faite: boolean;
  creeLe: number;
}

interface TasksState {
  items: Tache[];
}

const initialState: TasksState = {
  items: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    ajouter: (
      state,
      action: PayloadAction<{
        titre: string;
        description: string;
        priorite: Priorite;
      }>
    ) => {
      state.items.unshift({
        id: String(Date.now()),
        titre: action.payload.titre,
        description: action.payload.description,
        priorite: action.payload.priorite,
        faite: false,
        creeLe: Date.now(),
      });
    },

    basculerFaite: (state, action: PayloadAction<string>) => {
      const tache = state.items.find(item => item.id === action.payload);

      if (tache) {
        tache.faite = !tache.faite;
      }
    },

    modifierPriorite: (
      state,
      action: PayloadAction<{ id: string; priorite: Priorite }>
    ) => {
      const tache = state.items.find(item => item.id === action.payload.id);

      if (tache) {
        tache.priorite = action.payload.priorite;
      }
    },

    supprimer: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    toutFaire: state => {
      state.items.forEach(item => {
        item.faite = true;
      });
    },
  },
});

export const {
  ajouter,
  basculerFaite,
  modifierPriorite,
  supprimer,
  toutFaire,
} = tasksSlice.actions;

export const selectToutesLesTaches = (state: RootState) => state.tasks.items;

export const selectTachesFaites = (state: RootState) =>
  state.tasks.items.filter(tache => tache.faite);

export const selectTachesEnCours = (state: RootState) =>
  state.tasks.items.filter(tache => !tache.faite);

export const selectTachesParPriorite =
  (priorite: Priorite) =>
  (state: RootState) =>
    state.tasks.items.filter(tache => tache.priorite === priorite);

export default tasksSlice.reducer;