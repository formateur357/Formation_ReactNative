import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fetchArticles } from '../../lib/articles';
import { Article } from '../../types/article';

export default function AccueilScreen() {
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let actif = true;

    const charger = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchArticles();

        if (actif) {
          setArticles(data.slice(0, 30));
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

    charger();

    return () => {
      actif = false;
    };
  }, []);

  const ouvrirArticle = (article: Article) => {
    router.push({
      pathname: '/article/[id]',
      params: {
        id: String(article.id),
        titre: article.title,
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.info}>Chargement des articles...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Erreur : {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={articles}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => ouvrirArticle(item)}
          >
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.articleBody} numberOfLines={2}>
              {item.body}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  list: {
    padding: 16,
    gap: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 6,
  },
  articleBody: {
    color: '#475569',
    lineHeight: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 24,
  },
  info: {
    color: '#475569',
  },
  error: {
    color: '#dc2626',
    fontWeight: '800',
    textAlign: 'center',
  },
});