import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from 'react';

export default function CompteurScreen() {
  const [count, setCount] = useState(0);
  const [historique, setHistorique] = useState<number[] | null>([]);

  useEffect(() => {
    console.log('Le composant est monte')
  }, []);

  useEffect(() => {
    console.log('Le compteur a change', count)
  }, [count]);

/*
  useEffect(() => {
    const intervalId = setInterval(() => {
        console.log('tick');
    }, 1000);

    return () => {
        clearInterval(intervalId);
    };
  }, []);
*/

  const ajouterHistorique = (ancienneValeur: number) => {
    setHistorique(prev => [ancienneValeur, ...prev].slice(0, 5));
  }

  const incrementer = () => {
    setCount(prev => {
        if (prev >= 10) return prev;
        ajouterHistorique(prev);
        return prev + 1;
    })
  }

  const decrementer = () => {
    setCount(prev => {
        if (prev <= 0) return prev;
        ajouterHistorique(prev);
        return prev - 1;
    })
  }

  const reset = () => {
    setCount(prev => {
        if (prev === 0) return prev;
        ajouterHistorique(prev);
        return 0;
    })
  }

  const estPair = count % 2 === 0;

  return (
      <View style={styles.screen}>
        <Text style={[styles.count, estPair ? styles.even : styles.odd]}>
            {count}
        </Text>

        <View style={styles.row}>
            <Pressable
              style={[styles.button, count === 0 && styles.buttonDisabled]}
              onPress={decrementer}
              disabled={count === 0}
            >
              <Text style={styles.buttonText}>-</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={reset}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </Pressable>
            <Pressable
              style={[styles.button, count === 10 && styles.buttonDisabled]}
              onPress={incrementer}
              disabled={count === 10}
            >
              <Text style={styles.buttonText}>+</Text>
            </Pressable>
        </View>

        <Text style={styles.subtitle}>Historique</Text>
        {historique.map((valeur, index) => (
            <Text key={`${valeur}-${index}`} style={styles.historyItem}>
                {valeur}
            </Text>
        ))}
      </View>
  );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f8fafc",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    count: {
        fontSize: 88,
        fontWeight: '900',
        marginBottom: 32,
    },
    even: {
        color: '#16a34a',
    },
    odd: {
        color: '#dc2626',
    },
    row: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    button: {
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        minWidth: 72,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
    buttonDisabled: {
        opacity: 0.4,
    },
    historyItem: {
        fontSize: 16,
        color: '#334155',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    }
});
