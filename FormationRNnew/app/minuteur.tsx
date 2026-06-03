import { useState, useEffect, useRef } from 'react';
import { Alert, Pressable, Text, TextInput, View, StyleSheet } from 'react-native';

export default function MinuteurScreen() {

    const [duree, setDuree] = useState('60'); // secondes
    const [restant, setRestant] = useState(60);
    const [actif, setActif] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Formater en MM:SS
    const formater = (sec: number) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // À compléter : useEffect pour démarrer/arrêter l'intervalle

    const demarrer = () => {
        if (restant <= 0) return;
        setActif(true);
    }

    const pause = () => {
        setActif(false);
    }

    const reinitialiser = () => {
        const nouvelleDuree = Number(duree);

        if (Number.isNaN(nouvelleDuree) || nouvelleDuree <= 0) {
            Alert.alert(`Erreur`, 'Saisissez une durée valide en secondes');
            return;
        }

        setActif(false);
        setRestant(nouvelleDuree);
    }

    useEffect(() => {
        if (!actif) return;

        intervalRef.current = setInterval(() => {
            setRestant(prev => {
                if (prev <= 1) {
                    setActif(false);
                    Alert.alert('Minuteur terminé', 'Le temps est écoulé');
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [actif]);

    return (
        <View style={styles.screen}>
          <Text style={styles.title}>Minuteur</Text>

          <TextInput
            style={styles.input}
            value={duree}
            onChangeText={setDuree}
            keyboardType="numeric"
            placeholder="Durée en secondes"
          />

          <Text style={styles.time}>{formater(restant)}</Text>

          <View style={styles.row}>
            <Pressable style={styles.button} onPress={demarrer}>
              <Text style={styles.buttonText}>Démarrer</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={pause}>
              <Text style={styles.buttonText}>Pause</Text>
            </Pressable>

            <Pressable style={styles.buttonSecondary} onPress={reinitialiser}>
              <Text style={styles.buttonText}>Reset</Text>
            </Pressable>
          </View>
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    maxWidth: 280,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    backgroundColor: 'white',
    marginBottom: 24,
    textAlign: 'center',
  },
  time: {
    fontSize: 72,
    fontWeight: '900',
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonSecondary: {
    backgroundColor: '#f97316',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '800',
  },
});