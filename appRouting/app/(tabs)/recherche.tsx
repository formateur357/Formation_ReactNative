import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { fetchArticles } from '../../lib/articles';
import { Article } from '../../types/article';

export default function RechercheScreen() {
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);
  const [recherche, setRecherche] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let actif = true;

    const charger = async () => {
      const data = await fetchArticles();

      if (actif) {
        setArticles(data);
        setLoading(false);
      }
    };

    charger();

    return () => {
      actif = false;
    };
  }, []);

  const articlesFiltres = useMemo(() => {
    const texte = recherche.trim().toLowerCase();

    if (!texte) {
      return articles;
    }

    return articles.filter(article =>
      article.title.toLowerCase().includes(texte)
    );
  }, [articles, recherche]);

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
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.input}
        value={recherche}
        onChangeText={setRecherche}
        placeholder="Rechercher un article..."
      />

      <Text style={styles.count}>
        {articlesFiltres.length} résultat(s)
      </Text>

      <FlatList
        data={articlesFiltres}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => ouvrirArticle(item)}
          >
            <Text style={styles.articleTitle}>{item.title}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucun article trouvé.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16,
    marginBottom: 12,
  },
  count: {
    color: '#64748b',
    fontWeight: '800',
    marginBottom: 8,
  },
  list: {
    gap: 10,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  articleTitle: {
    fontWeight: '900',
    color: '#0f172a',
  },
  empty: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});