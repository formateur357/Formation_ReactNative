import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  ajouter,
  basculerFaite,
  modifierPriorite,
  Priorite,
  selectToutesLesTaches,
  supprimer,
  toutFaire,
} from '../store/tasksSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

type Filtre = 'toutes' | 'en-cours' | 'terminees';

const PRIORITES: Priorite[] = ['basse', 'normale', 'haute'];

export default function TachesScreen() {
  const dispatch = useAppDispatch();
  const taches = useAppSelector(selectToutesLesTaches);

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [priorite, setPriorite] = useState<Priorite>('normale');
  const [filtre, setFiltre] = useState<Filtre>('toutes');

  const tachesFiltrees = useMemo(() => {
    if (filtre === 'en-cours') {
      return taches.filter(tache => !tache.faite);
    }

    if (filtre === 'terminees') {
      return taches.filter(tache => tache.faite);
    }

    return taches;
  }, [taches, filtre]);

  const restantes = useMemo(() => {
    return taches.filter(tache => !tache.faite).length;
  }, [taches]);

  const ajouterTache = () => {
    const titreNettoye = titre.trim();

    if (!titreNettoye) {
      return;
    }

    dispatch(
      ajouter({
        titre: titreNettoye,
        description: description.trim(),
        priorite,
      })
    );

    setTitre('');
    setDescription('');
    setPriorite('normale');
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Tâches Redux Toolkit</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={titre}
          onChangeText={setTitre}
          placeholder="Titre"
        />

        <TextInput
          style={[styles.input, styles.textarea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          multiline
        />

        <View style={styles.row}>
          {PRIORITES.map(item => {
            const active = priorite === item;

            return (
              <Pressable
                key={item}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setPriorite(item)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable style={styles.addButton} onPress={ajouterTache}>
          <Text style={styles.addButtonText}>Ajouter</Text>
        </Pressable>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.counter}>{restantes} tâches restantes</Text>

        <Pressable onPress={() => dispatch(toutFaire())}>
          <Text style={styles.link}>Tout faire</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        {(['toutes', 'en-cours', 'terminees'] as Filtre[]).map(item => {
          const active = filtre === item;

          return (
            <Pressable
              key={item}
              style={[styles.filter, active && styles.filterActive]}
              onPress={() => setFiltre(item)}
            >
              <Text
                style={[styles.filterText, active && styles.filterTextActive]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={tachesFiltrees}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune tâche à afficher.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Pressable
              style={[styles.checkbox, item.faite && styles.checkboxDone]}
              onPress={() => dispatch(basculerFaite(item.id))}
            >
              <Text style={styles.checkboxText}>
                {item.faite ? '✓' : ''}
              </Text>
            </Pressable>

            <View style={styles.taskContent}>
              <Text
                style={[styles.taskTitle, item.faite && styles.taskTitleDone]}
              >
                {item.titre}
              </Text>

              {!!item.description && (
                <Text style={styles.taskDescription}>
                  {item.description}
                </Text>
              )}

              <View style={styles.priorityRow}>
                {PRIORITES.map(p => (
                  <Pressable
                    key={p}
                    onPress={() =>
                      dispatch(
                        modifierPriorite({
                          id: item.id,
                          priorite: p,
                        })
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.priority,
                        item.priorite === p && styles.priorityActive,
                      ]}
                    >
                      {p}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Pressable onPress={() => dispatch(supprimer(item.id))}>
              <Text style={styles.delete}>🗑</Text>
            </Pressable>
          </View>
        )}
      />
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
    fontSize: 26,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 16,
  },
  form: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 16,
    gap: 10,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#f8fafc',
  },
  textarea: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chip: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  chipActive: {
    backgroundColor: '#2563eb',
  },
  chipText: {
    color: '#334155',
    fontWeight: '800',
  },
  chipTextActive: {
    color: 'white',
  },
  addButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
  },
  counter: {
    fontWeight: '800',
    color: '#0f172a',
  },
  link: {
    color: '#2563eb',
    fontWeight: '900',
  },
  filter: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  filterActive: {
    backgroundColor: '#0f172a',
  },
  filterText: {
    color: '#334155',
    fontWeight: '800',
  },
  filterTextActive: {
    color: 'white',
  },
  task: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 14,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#2563eb',
  },
  checkboxText: {
    color: 'white',
    fontWeight: '900',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0f172a',
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  taskDescription: {
    color: '#475569',
    marginTop: 4,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  priority: {
    color: '#64748b',
    fontWeight: '700',
  },
  priorityActive: {
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
  delete: {
    fontSize: 20,
  },
  empty: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 24,
  },
});