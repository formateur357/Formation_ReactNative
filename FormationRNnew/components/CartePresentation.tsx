import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useState } from 'react';

interface CartePresentationProps {
    prenom: string;
    nom: string;
    role: string;
    ville: string;
    photoUrl: string;
    onContact: () => void;
}

export default function CartePresentation({
    prenom,
    nom,
    role,
    ville,
    photoUrl,
    onContact,
}: CartePresentationProps) {
  const [favori, setFavori] = useState(false);

  return (
      <View style={styles.card}>
      <View>
        <Text>{favori ? 'Favori' : 'Pas favori'}</Text>
        <Pressable
          style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
          ]}
          onPress={() => setFavori(!favori)}
        >
          <Text>Toggle Favori</Text>
        </Pressable>
      </View>
      <Image
        source={{ uri: photoUrl }}
        style={ styles.avatar }
        accessibilityLabel={`Photo de {prenom} {nom}`}
      />
      <Text style={styles.name}>{prenom} {nom}</Text>
      <Text style={styles.role}>{role}</Text>
      <Text style={styles.city}>{ville}</Text>

      <Pressable
        style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
        ]}
        onPress={onContact}
      >
        <Text style={styles.buttonText}>Contacter</Text>
      </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        maxWidth: 340,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: '800',
        color: '#111827',
    },
    span: {
        fontWeight: 'bold',
    },
    role: {
        fontSize: 16,
        color: '#4b5563',
        marginTop: 4,
    },
    city: {
        fontSize: 16,
        color: '#374151',
        marginTop: 12,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#374151',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 999,
    },
    buttonPressed: {
        opacity: 0.75,
        transform: [{ scale: 0.98 }],
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '700',
    },
});
