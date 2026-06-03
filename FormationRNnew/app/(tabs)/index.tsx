import { Alert, View, StyleSheet } from 'react-native';
import CartePresentation from '../../components/CartePresentation';

export default function HomeScreen() {
  return (
      <View style={styles.screen}>
        <CartePresentation
            prenom="Alice"
            nom="Dupont"
            role="Développeuse React Native"
            ville="Paris"
            photoUrl="https://picsum.photos/200"
            onContact={() => Alert.alert('Contact', 'Vous contactez Alice')}
        />
        <CartePresentation
            prenom="John"
            nom="Wick"
            role="Tueur à gages"
            ville="New York"
            photoUrl="https://picsum.photos/201"
            onContact={() => Alert.alert('Contact', 'Vous contactez John')}
        />
      </View>
  );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#eef2ff",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
});
