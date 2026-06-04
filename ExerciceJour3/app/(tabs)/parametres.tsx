import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { annulerRappelCuisine, programmerRappelCuisine } from '../../services/notifications';
import { ThemePreference, usePreferencesStore } from '../../store/preferencesStore';

const THEMES: ThemePreference[] = ['system', 'light', 'dark'];

export default function ParametresScreen() {
  const { colors } = useAppTheme();
  const theme = usePreferencesStore(state => state.theme);
  const setTheme = usePreferencesStore(state => state.setTheme);
  const notificationsEnabled = usePreferencesStore(state => state.notificationsEnabled);
  const toggleNotifications = usePreferencesStore(state => state.toggleNotifications);
  const cookingReminderId = usePreferencesStore(state => state.cookingReminderId);
  const setCookingReminderId = usePreferencesStore(state => state.setCookingReminderId);
  const resetPreferences = usePreferencesStore(state => state.resetPreferences);

  const handleToggleNotification = async () => {
    try {
      if (notificationsEnabled) {
        await annulerRappelCuisine(cookingReminderId);
        setCookingReminderId(null);
        toggleNotifications();
        return;
      }

      const id = await programmerRappelCuisine(18, 30);
      setCookingReminderId(id);
      toggleNotifications();
      Alert.alert('Rappel activé', 'Tu recevras “Heure de cuisiner !” chaque jour à 18h30.');
    } catch (error) {
      Alert.alert('Notification impossible', error instanceof Error ? error.message : 'Erreur inconnue');
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Paramètres</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>Mode sombre et notification programmable.</Text>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Thème</Text>
        <View style={styles.themeRow}>
          {THEMES.map(item => {
            const active = item === theme;
            return (
              <Pressable
                key={item}
                style={[styles.themeButton, { borderColor: colors.border, backgroundColor: active ? colors.primary : colors.cardMuted }]}
                onPress={() => setTheme(item)}
              >
                <Text style={{ color: active ? colors.primaryText : colors.text, fontWeight: '900' }}>
                  {item === 'system' ? 'Système' : item === 'light' ? 'Clair' : 'Sombre'}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <View style={styles.notificationRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Heure de cuisiner !</Text>
            <Text style={[styles.note, { color: colors.textMuted }]}>Notification locale quotidienne à 18h30.</Text>
          </View>
          <Switch value={notificationsEnabled} onValueChange={handleToggleNotification} />
        </View>
      </View>

      <Pressable style={[styles.resetButton, { backgroundColor: colors.danger }]} onPress={resetPreferences}>
        <Text style={styles.resetText}>Réinitialiser les préférences</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, gap: 14 },
  title: { fontSize: 30, fontWeight: '900' },
  subtitle: { fontSize: 14, fontWeight: '700', lineHeight: 20 },
  card: { borderWidth: 1, borderRadius: 18, padding: 16, gap: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '900' },
  themeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  themeButton: { borderWidth: 1, borderRadius: 999, paddingVertical: 10, paddingHorizontal: 14 },
  notificationRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  note: { marginTop: 4, lineHeight: 20 },
  resetButton: { padding: 14, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  resetText: { color: 'white', fontWeight: '900' }
});
