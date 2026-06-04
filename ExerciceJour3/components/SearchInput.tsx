import { StyleSheet, TextInput, View } from 'react-native';
import { AppColors } from '../constants/colors';

interface SearchInputProps {
  value: string;
  onChangeText: (value: string) => void;
  colors: AppColors;
}

export function SearchInput({ value, onChangeText, colors }: SearchInputProps) {
  return (
    <View style={[styles.wrapper, { backgroundColor: colors.card, borderColor: colors.border }]}> 
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Rechercher une recette, ex : chicken"
        placeholderTextColor={colors.textMuted}
        returnKeyType="search"
        autoCorrect={false}
        style={[styles.input, { color: colors.text }]}
        accessibilityLabel="Recherche de recettes"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4
  },
  input: {
    fontSize: 16,
    minHeight: 46
  }
});
