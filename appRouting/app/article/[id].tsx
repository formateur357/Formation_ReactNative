import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fetchArticleById } from '../../lib/articles';
import { Article } from '../../types/article';

export default function ArticleDetailScreen() {
  const { id, titre } = useLocalSearchParams<{
    id: string;
    titre?: string;
  }>();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Identifiant article manquant');
      setLoading(false);
      return;
    }

    let actif = true;

    const charger = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchArticleById(id);

        if (actif) {
          setArticle(data);
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
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.info}>Chargement de l’article...</Text>
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
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Paramètre reçu</Text>
      <Text style={styles.param}>{titre ?? 'Titre non fourni'}</Text>

      <Text style={styles.title}>{article?.title}</Text>
      <Text style={styles.body}>{article?.body}</Text>
      <Text style={styles.meta}>Article #{id}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
    gap: 14,
  },
  label: {
    color: '#64748b',
    fontWeight: '800',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  param: {
    color: '#2563eb',
    fontWeight: '800',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0f172a',
    lineHeight: 32,
  },
  body: {
    color: '#334155',
    fontSize: 17,
    lineHeight: 26,
  },
  meta: {
    color: '#64748b',
    marginTop: 12,
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