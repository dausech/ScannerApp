import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useState, createContext } from 'react';
import { useColorScheme, TouchableOpacity } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import ScannerScreen from './screens/Scanner.jsx';
import HomeScreen from './screens/Home.jsx';
import HistoryScreen from './screens/History.jsx';

/** Context for sharing barcode data across components */
const UserContext = createContext();

const Drawer = createDrawerNavigator();

/**
 * Main application component that sets up navigation and theme handling
 * @returns {React.ReactElement} The root component of the application
 */
export default function App() {
  const [theme, setTheme] = useState(useColorScheme());

  /**
   * Toggles between light and dark theme
   */
  function toggleTheme() {
    setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }

  const [lastBarcode, setLastBarcode] = useState('');

  return (
    <UserContext.Provider value={{ lastBarcode, setLastBarcode }}>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator
          screenOptions={{
            headerRight: () => (
              <TouchableOpacity
                onPress={toggleTheme}
                style={{ marginRight: 15 }}>
                <Icon
                  name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}
                  size={24}
                  color={theme === 'dark' ? 'white' : 'black'}
                />
              </TouchableOpacity>
            ),
          }}>
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon name="home-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Scanner"
            component={ScannerScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon name="scan-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="History"
            component={HistoryScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon name="time-outline" size={size} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export { UserContext };
