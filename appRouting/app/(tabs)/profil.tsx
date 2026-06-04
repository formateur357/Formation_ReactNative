import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProfilScreen() {
  const router = useRouter();

  const deconnecter = () => {
    router.replace('/connexion');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>MG</Text>
      </View>

      <Text style={styles.name}>Morgan Guy</Text>
      <Text style={styles.email}>morgan@example.com</Text>

      <Pressable style={styles.button} onPress={deconnecter}>
        <Text style={styles.buttonText}>Déconnexion</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#0d47a1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  avatarText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0f172a',
  },
  email: {
    color: '#64748b',
    marginTop: 4,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#dc2626',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
  },
});