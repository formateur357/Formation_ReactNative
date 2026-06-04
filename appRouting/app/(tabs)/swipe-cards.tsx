import { useMemo, useState } from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.4;
const EXIT_POSITION = SCREEN_WIDTH * 1.3;

interface ProfilCard {
  id: string;
  nom: string;
  role: string;
  ville: string;
  couleur: string;
}

const PROFILS_INITIAUX: ProfilCard[] = [
  {
    id: '1',
    nom: 'Alice Martin',
    role: 'Développeuse React Native',
    ville: 'Paris',
    couleur: '#2563eb',
  },
  {
    id: '2',
    nom: 'Karim Bernard',
    role: 'UX Designer',
    ville: 'Lyon',
    couleur: '#7c3aed',
  },
  {
    id: '3',
    nom: 'Chloé Dubois',
    role: 'Product Owner',
    ville: 'Nantes',
    couleur: '#059669',
  },
  {
    id: '4',
    nom: 'Nina Laurent',
    role: 'Développeuse Fullstack',
    ville: 'Bordeaux',
    couleur: '#ea580c',
  },
  {
    id: '5',
    nom: 'Hugo Petit',
    role: 'Tech Lead',
    ville: 'Toulouse',
    couleur: '#dc2626',
  },
];

export default function SwipeCardsScreen() {
  const [profils, setProfils] = useState<ProfilCard[]>(PROFILS_INITIAUX);
  const [acceptes, setAcceptes] = useState(0);
  const [refuses, setRefuses] = useState(0);

  const cartesVisibles = useMemo(() => profils.slice(0, 3), [profils]);

  const retirerPremiereCarte = () => {
    setProfils(prev => prev.slice(1));
  };

  const accepter = () => {
    setAcceptes(prev => prev + 1);
    retirerPremiereCarte();
  };

  const refuser = () => {
    setRefuses(prev => prev + 1);
    retirerPremiereCarte();
  };

  const reset = () => {
    setProfils(PROFILS_INITIAUX);
    setAcceptes(0);
    setRefuses(0);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Swipe Cards</Text>

      <View style={styles.scoreRow}>
        <Text style={styles.score}>✅ {acceptes}</Text>
        <Text style={styles.score}>❌ {refuses}</Text>
      </View>

      <View style={styles.deck}>
        {cartesVisibles.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Plus aucune carte</Text>

            <Pressable style={styles.resetButton} onPress={reset}>
              <Text style={styles.resetButtonText}>Recommencer</Text>
            </Pressable>
          </View>
        ) : (
          cartesVisibles
            .map((profil, index) => {
              const isTop = index === 0;

              return (
                <SwipeCard
                  key={profil.id}
                  item={profil}
                  index={index}
                  disabled={!isTop}
                  onSwipeLeft={refuser}
                  onSwipeRight={accepter}
                />
              );
            })
            .reverse()
        )}
      </View>

      <Text style={styles.help}>
        Swipe à droite pour accepter, à gauche pour refuser.
      </Text>
    </View>
  );
}

interface SwipeCardProps {
  item: ProfilCard;
  index: number;
  disabled: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

function SwipeCard({
  item,
  index,
  disabled,
  onSwipeLeft,
  onSwipeRight,
}: SwipeCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .onUpdate(event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY / 4;
    })
    .onEnd(event => {
      const swipeRight = event.translationX > SWIPE_THRESHOLD;
      const swipeLeft = event.translationX < -SWIPE_THRESHOLD;

      if (swipeRight) {
        translateX.value = withTiming(EXIT_POSITION, {}, finished => {
          if (finished) {
            runOnJS(onSwipeRight)();
          }
        });
        return;
      }

      if (swipeLeft) {
        translateX.value = withTiming(-EXIT_POSITION, {}, finished => {
          if (finished) {
            runOnJS(onSwipeLeft)();
          }
        });
        return;
      }

      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-12, 0, 12],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value + index * 12 },
        { rotate: `${rotate}deg` },
        { scale: 1 - index * 0.04 },
      ],
    };
  });

  const acceptStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ scale: opacity }],
    };
  });

  const rejectStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ scale: opacity }],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.card,
          { backgroundColor: item.couleur, zIndex: 100 - index },
          animatedCardStyle,
        ]}
      >
        <Animated.View style={[styles.indicator, styles.accept, acceptStyle]}>
          <Text style={styles.indicatorText}>✅</Text>
        </Animated.View>

        <Animated.View style={[styles.indicator, styles.reject, rejectStyle]}>
          <Text style={styles.indicatorText}>❌</Text>
        </Animated.View>

        <Text style={styles.cardName}>{item.nom}</Text>
        <Text style={styles.cardRole}>{item.role}</Text>
        <Text style={styles.cardCity}>📍 {item.ville}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 48,
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 12,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 18,
  },
  score: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
  },
  deck: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH - 48,
    height: 440,
    borderRadius: 28,
    padding: 28,
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  cardName: {
    color: 'white',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
  },
  cardRole: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardCity: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontWeight: '700',
  },
  indicator: {
    position: 'absolute',
    top: 28,
    borderWidth: 4,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  accept: {
    left: 28,
    borderColor: '#16a34a',
  },
  reject: {
    right: 28,
    borderColor: '#dc2626',
  },
  indicatorText: {
    fontSize: 34,
  },
  empty: {
    alignItems: 'center',
    gap: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0f172a',
  },
  resetButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: '900',
  },
  help: {
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '700',
    paddingBottom: 24,
  },
});