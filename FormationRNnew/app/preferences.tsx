import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {
  LanguePreference,
  TaillePolicePreference,
  ThemePreference,
  usePreferencesStore,
} from '../store/usePreferencesStore';

const THEMES: ThemePreference[] = ['light', 'dark', 'auto'];
const LANGUES: LanguePreference[] = ['fr', 'en', 'es'];
const TAILLES: TaillePolicePreference[] = ['petite', 'normale', 'grande'];

export default function PreferencesScreen() {
  const theme = usePreferencesStore(state => state.theme);
  const langue = usePreferencesStore(state => state.langue);
  const notificationsActives = usePreferencesStore(
    state => state.notificationsActives
  );
  const taillePolice = usePreferencesStore(state => state.taillePolice);

  const setTheme = usePreferencesStore(state => state.setTheme);
  const setLangue = usePreferencesStore(state => state.setLangue);
  const toggleNotifications = usePreferencesStore(
    state => state.toggleNotifications
  );
  const setTaillePolice = usePreferencesStore(state => state.setTaillePolice);
  const resetPreferences = usePreferencesStore(state => state.resetPreferences);

  const isDark = theme === 'dark';
  const fontSize = taillePolice === 'petite'
    ? 14
    : taillePolice === 'grande'
      ? 20
      : 16;

  return (
    <View style={[styles.screen, isDark && styles.screenDark]}>
      <Text style={[styles.title, isDark && styles.textDark]}>
        Préférences
      </Text>

      <Text style={[styles.preview, { fontSize }, isDark && styles.textDark]}>
        Exemple de texte avec vos préférences actuelles.
      </Text>

      <PreferenceGroup title="Thème" isDark={isDark}>
        <View style={styles.row}>
          {THEMES.map(item => (
            <ChoiceButton
              key={item}
              label={item}
              active={theme === item}
              isDark={isDark}
              onPress={() => setTheme(item)}
            />
          ))}
        </View>
      </PreferenceGroup>

      <PreferenceGroup title="Langue" isDark={isDark}>
        <View style={styles.row}>
          {LANGUES.map(item => (
            <ChoiceButton
              key={item}
              label={item}
              active={langue === item}
              isDark={isDark}
              onPress={() => setLangue(item)}
            />
          ))}
        </View>
      </PreferenceGroup>

      <PreferenceGroup title="Taille de police" isDark={isDark}>
        <View style={styles.row}>
          {TAILLES.map(item => (
            <ChoiceButton
              key={item}
              label={item}
              active={taillePolice === item}
              isDark={isDark}
              onPress={() => setTaillePolice(item)}
            />
          ))}
        </View>
      </PreferenceGroup>

      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.label, isDark && styles.textDark]}>
          Notifications
        </Text>

        <Switch
          value={notificationsActives}
          onValueChange={toggleNotifications}
        />
      </View>

      <Pressable style={styles.resetButton} onPress={resetPreferences}>
        <Text style={styles.resetButtonText}>Réinitialiser</Text>
      </Pressable>
    </View>
  );
}

interface PreferenceGroupProps {
  title: string;
  isDark: boolean;
  children: React.ReactNode;
}

function PreferenceGroup({ title, isDark, children }: PreferenceGroupProps) {
  return (
    <View style={[styles.card, isDark && styles.cardDark]}>
      <Text style={[styles.label, isDark && styles.textDark]}>{title}</Text>
      {children}
    </View>
  );
}

interface ChoiceButtonProps {
  label: string;
  active: boolean;
  isDark: boolean;
  onPress: () => void;
}

function ChoiceButton({ label, active, isDark, onPress }: ChoiceButtonProps) {
  return (
    <Pressable
      style={[
        styles.choice,
        isDark && styles.choiceDark,
        active && styles.choiceActive,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.choiceText,
          isDark && styles.textDark,
          active && styles.choiceTextActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 48,
    paddingHorizontal: 16,
    gap: 14,
  },
  screenDark: {
    backgroundColor: '#020617',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 8,
  },
  preview: {
    color: '#334155',
    marginBottom: 8,
  },
  textDark: {
    color: '#f8fafc',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  cardDark: {
    backgroundColor: '#0f172a',
  },
  label: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0f172a',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  choice: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  choiceDark: {
    backgroundColor: '#1e293b',
  },
  choiceActive: {
    backgroundColor: '#2563eb',
  },
  choiceText: {
    color: '#334155',
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  choiceTextActive: {
    color: 'white',
  },
  resetButton: {
    marginTop: 8,
    backgroundColor: '#dc2626',
    padding: 14,
    borderRadius: 12,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
  },
});