import { useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    View,
    Text,
    Pressable,
    ScrollView,
    StyleSheet
} from 'react-native';

interface Photo {
id: string;
author: string;
width: number;
height: number;
download_url: string;
}
type Categorie = 'toutes' | 'nature' | 'architecture' | 'portraits';

const CATEGORIES: Categorie[] = [
    'toutes',
    'nature',
    'architecture',
    'portraits'
];

export default function GalerieScreen() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categorieActive, setCategorieActive] = useState<Categorie>('toutes');
    const [photoSelectionnee, setPhotoSelectionnee] = useState<Photo | null>(null);

    useEffect(() => {
        let actif = true;

        const chargerPhotos = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('https://picsum.photos/v2/list?page=1&limit=30');

            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}`);
            }

            const data: Photo[] = await response.json();

            if (actif) {
                setPhotos(data);
            }
        } catch (err: unknown) {
            if (!actif) return;

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Erreur inconnue');
            }
        } finally {
            if (actif) {
                setLoading(false);
            }
        }
    };

    chargerPhotos();

    return () => {
        actif = false;
    };

    }, []);

    const photosFiltrees = useMemo(() => {
        if (categorieActive === 'toutes') {
            return photos;
        }

        return photos.filter(photo => {
            const idNumerique = Number(photo.id);

            if (Number.isNaN(idNumerique)) {
                return false;
            }

            if (categorieActive === 'architecture') {
                return idNumerique % 3 === 0
            }

            if (categorieActive === 'nature') {
                return idNumerique % 3 === 1
            }

            return idNumerique % 3 === 2
        });
    }, [photos, categorieActive]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text style={styles.info}>Chargement des photos...</Text>
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Erreur: {error}</Text>
            </View>
        )
    }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Galerie</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        {CATEGORIES.map(categorie => {
          const active = categorie === categorieActive;

          return (
            <Pressable
              key={categorie}
              style={[styles.filterButton, active && styles.filterButtonActive]}
              onPress={() => setCategorieActive(categorie)}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>
                {categorie}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        data={photosFiltrees}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => setPhotoSelectionnee(item)}
          >
            <Image
              source={{ uri: item.download_url }}
              style={styles.image}
            />

            <Text style={styles.author} numberOfLines={1}>
              {item.author}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.info}>Aucune photo pour cette catégorie.</Text>
        }
      />

      <Modal
        visible={photoSelectionnee !== null}
        animationType="slide"
        onRequestClose={() => setPhotoSelectionnee(null)}
      >
        <View style={styles.modal}>
          {photoSelectionnee && (
            <>
              <Image
                source={{ uri: photoSelectionnee.download_url }}
                style={styles.modalImage}
                resizeMode="contain"
              />

              <Text style={styles.modalTitle}>
                Photo #{photoSelectionnee.id}
              </Text>

              <Text style={styles.modalAuthor}>
                Auteur : {photoSelectionnee.author}
              </Text>

              <Pressable
                style={styles.closeButton}
                onPress={() => setPhotoSelectionnee(null)}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </Pressable>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0f172a',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filters: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#e2e8f0',
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
  },
  filterText: {
    color: '#334155',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  filterTextActive: {
    color: 'white',
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 14,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#e2e8f0',
  },
  author: {
    padding: 10,
    fontWeight: '700',
    color: '#0f172a',
  },
  center: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  info: {
    marginTop: 12,
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
  },
  error: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  modal: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalImage: {
    width: '100%',
    height: '65%',
  },
  modalTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 24,
  },
  modalAuthor: {
    color: '#cbd5e1',
    fontSize: 16,
    marginTop: 8,
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 999,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },
});