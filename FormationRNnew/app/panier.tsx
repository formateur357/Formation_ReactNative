import { useMemo, useReducer } from 'react';
import {
    FlatList,
    View,
    Text,
    Pressable,
    StyleSheet
} from 'react-native';

type Action =
    | { type: 'AJOUTER'; payload: Produit }
    | { type: 'RETIRER'; payload: string } // id du produit
    | { type: 'QUANTITE'; payload: { id: string; quantite: number } }
    | { type: 'VIDER' };

interface Produit {
    id: string;
    nom: string;
    prix: number;
    quantite: number;
}

const catalogue: Produit[] = [
  {id: '1', nom: 'Clavier mécanique', prix: 89.99, quantite: 1 },
  {id: '2', nom: 'Souris sans fil', prix: 39.99, quantite: 4 },
  {id: '3', nom: 'Casque audio', prix: 129.99, quantite: 2 },
];

function panierReducer(state: Produit[], action: Action): Produit[] {
    switch (action.type) {
        case 'AJOUTER':
            // Si déjà dans le panier, incrémenter la quantité
            // Sinon ajouter avec quantite = 1
            const produitExiste = state.some(
                produit => produit.id === action.payload.id
            );

            if (produitExiste) {
                return state.map(produit =>
                    produit.id === action.payload.id
                      ? { ...produit, quantite: produit.quantite + 1 }
                      : produit
                );
            }

            return [...state, { ...action.payload, quantite: 1 }];

        case 'RETIRER':
            return state.filter(produit => produit.id !== action.payload );

        case 'QUANTITE':
            return state.map(produit =>
                produit.id === action.payload.id
                  ? {
                        ...produit,
                        quantite: Math.max(1, action.payload.quantite),
                    }
                  : produit
            );

        case 'VIDER':
            return [];

        default:
            return state;
    }
}

export default function PanierScreen() {
    const [panier, dispatch] = useReducer(panierReducer, []);

    const total = useMemo(() => {
        return panier.reduce(
            (somme, produit) => somme + produit.prix * produit.quantite,
            0
        );
    }, [panier]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Catalogue</Text>

      <View style={styles.catalogue}>
        {catalogue.map(produit => (
          <Pressable
            key={produit.id}
            style={styles.catalogueButton}
            onPress={() => dispatch({ type: 'AJOUTER', payload: produit })}
          >
            <Text style={styles.catalogueText}>
              Ajouter {produit.nom}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.title}>Panier</Text>

      <FlatList
        data={panier}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>Le panier est vide.</Text>
        }
        renderItem={({ item }) => {
          const sousTotal = item.prix * item.quantite;

          return (
            <View style={styles.row}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.nom}</Text>
                <Text style={styles.productPrice}>
                  {item.prix.toFixed(2)} € × {item.quantite}
                </Text>
                <Text style={styles.subtotal}>
                  Sous-total : {sousTotal.toFixed(2)} €
                </Text>
              </View>

              <View style={styles.actions}>
                <Pressable
                  style={styles.smallButton}
                  onPress={() =>
                    dispatch({
                      type: 'QUANTITE',
                      payload: {
                        id: item.id,
                        quantite: item.quantite - 1,
                      },
                    })
                  }
                >
                  <Text style={styles.buttonText}>−</Text>
                </Pressable>

                <Pressable
                  style={styles.smallButton}
                  onPress={() =>
                    dispatch({
                      type: 'QUANTITE',
                      payload: {
                        id: item.id,
                        quantite: item.quantite + 1,
                      },
                    })
                  }
                >
                  <Text style={styles.buttonText}>+</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() =>
                    dispatch({ type: 'RETIRER', payload: item.id })
                  }
                >
                  <Text style={styles.buttonText}>🗑</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total : {total.toFixed(2)} €</Text>

        <Pressable
          style={[styles.clearButton, panier.length === 0 && styles.disabled]}
          disabled={panier.length === 0}
          onPress={() => dispatch({ type: 'VIDER' })}
        >
          <Text style={styles.clearButtonText}>Vider le panier</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 12,
  },
  catalogue: {
    gap: 8,
    marginBottom: 24,
  },
  catalogueButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 10,
  },
  catalogueText: {
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
  },
  empty: {
    color: '#64748b',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
  row: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  productPrice: {
    color: '#475569',
    marginTop: 4,
  },
  subtotal: {
    color: '#0f172a',
    fontWeight: '700',
    marginTop: 6,
  },
  actions: {
    justifyContent: 'center',
    gap: 6,
  },
  smallButton: {
    backgroundColor: '#0f172a',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingVertical: 16,
    gap: 12,
  },
  total: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0f172a',
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#f97316',
    padding: 14,
    borderRadius: 12,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
});

