import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppColors } from '../constants/colors';

interface StateViewProps {
  colors: AppColors;
  title: string;
  message?: string;
  loading?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

export function StateView({
  colors,
  title,
  message,
  loading = false,
  actionLabel,
  onAction
}: StateViewProps) {
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color={colors.primary} />}
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {message && <Text style={[styles.message, { color: colors.textMuted }]}>{message}</Text>}
      {actionLabel && onAction && (
        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={onAction}
        >
          <Text style={[styles.buttonText, { color: colors.primaryText }]}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 10
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center'
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22
  },
  button: {
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 6
  },
  buttonText: {
    fontWeight: '900'
  }
});
