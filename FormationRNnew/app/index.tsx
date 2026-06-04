import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accueil</Text>

      <Link href="/compteur" style={styles.link}>Compteur</Link>
      <Link href="/galerie" style={styles.link}>Galerie</Link>
      <Link href="/minuteur" style={styles.link}>Minuteur</Link>
      <Link href="/panier" style={styles.link}>Panier</Link>
      <Link href="/preferences" style={styles.link}>Préférences</Link>
      <Link href="/taches" style={styles.link}>Tâches</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 16,
  },
  link: {
    fontSize: 18,
    color: '#2563eb',
  },
});