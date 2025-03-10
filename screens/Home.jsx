import { Text, View, StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';

/**
 * Home screen component that serves as the landing page
 * @returns {React.ReactElement} Home screen UI
 */
export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.paragraph, { color: colors.text }]}>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  camera: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
});

