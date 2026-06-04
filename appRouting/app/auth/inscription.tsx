import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function InscriptionScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput style={styles.input} placeholder="Nom" />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
      />

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Créer le compte</Text>
      </Pressable>

      <Link href="/connexion" style={styles.link}>
        Déjà un compte ? Se connecter
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  button: {
    backgroundColor: '#0d47a1',
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
  },
  link: {
    color: '#0d47a1',
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 12,
  },
});