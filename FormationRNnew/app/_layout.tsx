import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';

/*
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="preferences" options={{ title: 'Preferences' }} />
        <Stack.Screen name="taches" options={{ title: 'Tâches Redux' }} />
        <Stack.Screen name="compteur" options={{ title: 'Compteur' }} />
        <Stack.Screen name="minuteur" options={{ title: 'Minuteur' }} />
        <Stack.Screen name="galerie" options={{ title: 'Galerie' }} />
        <Stack.Screen name="panier" options={{ title: 'Panier' }} />
      </Stack>
    </Provider>
  );
}
*/

import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LayoutsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Layouts Flexbox</Text>

      <Section title="Layout A — Barre de navigation">
        <LayoutNavigation />
      </Section>

      <Section title="Layout B — Grille 2 colonnes">
        <LayoutGrid />
      </Section>

      <Section title="Layout C — Profil centré">
        <LayoutProfile />
      </Section>

      <Section title="Layout D — Chat">
        <LayoutChat />
      </Section>
    </ScrollView>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function LayoutNavigation() {
  const items = [
    { icon: '🏠', label: 'Accueil' },
    { icon: '🔍', label: 'Recherche' },
    { icon: '❤️', label: 'Favoris' },
    { icon: '👤', label: 'Profil' },
  ];

  return (
    <View style={styles.phoneFrame}>
      <View style={styles.mainContent}>
        <Text style={styles.mutedText}>Contenu flex: 1</Text>
      </View>

      <View style={styles.bottomNav}>
        {items.map(item => (
          <View key={item.label} style={styles.navItem}>
            <Text style={styles.navIcon}>{item.icon}</Text>
            <Text style={styles.navLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function LayoutGrid() {
  const cards = Array.from({ length: 6 }, (_, index) => `Card ${index + 1}`);

  return (
    <View style={styles.phoneFrame}>
      <TextInput
        style={styles.search}
        placeholder="🔎 Rechercher..."
        placeholderTextColor="#64748b"
      />

      <View style={styles.grid}>
        {cards.map(card => (
          <View key={card} style={styles.gridCard}>
            <Text style={styles.gridCardText}>{card}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function LayoutProfile() {
  return (
    <View style={[styles.phoneFrame, styles.profileContainer]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>MG</Text>
      </View>

      <Text style={styles.profileName}>Morgan Guy</Text>

      <View style={styles.statsRow}>
        <Stat value="12" label="posts" />
        <Stat value="45k" label="abonnés" />
        <Stat value="23" label="suivis" />
      </View>

      <View style={styles.profileActions}>
        <View style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Suivre</Text>
        </View>

        <View style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Message</Text>
        </View>
      </View>
    </View>
  );
}

interface StatProps {
  value: string;
  label: string;
}

function Stat({ value, label }: StatProps) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function LayoutChat() {
  return (
    <View style={styles.phoneFrame}>
      <Message author="Alice" text="Bonjour !" />
      <Message author="Moi" text="Salut ! Comment ça va ?" mine />
      <Message author="Alice" text="Ça va bien, merci." />
      <Message author="Moi" text="Parfait, on commence ?" mine />
    </View>
  );
}

interface MessageProps {
  author: string;
  text: string;
  mine?: boolean;
}

function Message({ author, text, mine = false }: MessageProps) {
  return (
    <View style={[styles.messageRow, mine && styles.messageRowMine]}>
      <View style={[styles.messageBubble, mine && styles.messageBubbleMine]}>
        <Text style={[styles.messageAuthor, mine && styles.messageAuthorMine]}>
          {author}
        </Text>
        <Text style={[styles.messageText, mine && styles.messageTextMine]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0f172a',
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#334155',
  },
  phoneFrame: {
    minHeight: 260,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },

  // Layout A
  mainContent: {
    minHeight: 190,
    backgroundColor: '#f1f5f9',
  },
  mutedText: {
    color: '#64748b',
    fontWeight: '700',
  },
  bottomNav: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: 'white',
  },
  navItem: {
    paddingVertical: 10,
    gap: 3,
  },
  navIcon: {
    fontSize: 22,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },

  // Layout B
  search: {
    margin: 12,
    padding: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    fontSize: 16,
  },
  grid: {
    padding: 8,
  },
  gridCard: {
    padding: 8,
  },
  gridCardText: {
    backgroundColor: '#dbeafe',
    borderRadius: 14,
    paddingVertical: 28,
    textAlign: 'center',
    color: '#1e3a8a',
    fontWeight: '900',
  },

  // Layout C
  profileContainer: {
    padding: 20,
    gap: 14,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#2563eb',
  },
  avatarText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 24,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0f172a',
  },
  statsRow: {
    gap: 26,
  },
  stat: {
  },
  statValue: {
    fontWeight: '900',
    color: '#0f172a',
    fontSize: 16,
  },
  statLabel: {
    color: '#64748b',
    fontSize: 12,
  },
  profileActions: {
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 999,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '900',
  },
  secondaryButton: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 999,
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontWeight: '900',
  },

  // Layout D
  messageRow: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  messageRowMine: {
  },
  messageBubble: {
    maxWidth: '75%',
    backgroundColor: '#e2e8f0',
    borderRadius: 16,
    padding: 10,
  },
  messageBubbleMine: {
    backgroundColor: '#2563eb',
  },
  messageAuthor: {
    fontSize: 12,
    fontWeight: '900',
    color: '#475569',
    marginBottom: 2,
  },
  messageAuthorMine: {
    color: '#dbeafe',
    textAlign: 'right',
  },
  messageText: {
    color: '#0f172a',
    fontWeight: '600',
  },
  messageTextMine: {
    color: 'white',
  },
});