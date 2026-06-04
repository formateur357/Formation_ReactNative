export interface AppColors {
  background: string;
  card: string;
  cardMuted: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryText: string;
  border: string;
  danger: string;
  success: string;
}

export const lightColors: AppColors = {
  background: '#fff7ed',
  card: '#ffffff',
  cardMuted: '#ffedd5',
  text: '#1c1917',
  textMuted: '#78716c',
  primary: '#f97316',
  primaryText: '#ffffff',
  border: '#fed7aa',
  danger: '#dc2626',
  success: '#16a34a'
};

export const darkColors: AppColors = {
  background: '#0c0a09',
  card: '#1c1917',
  cardMuted: '#292524',
  text: '#fafaf9',
  textMuted: '#a8a29e',
  primary: '#fb923c',
  primaryText: '#0c0a09',
  border: '#44403c',
  danger: '#f87171',
  success: '#4ade80'
};
