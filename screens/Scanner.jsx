import { Text, SafeAreaView, StyleSheet, Platform, View, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useCallback, useContext } from 'react';
import * as Haptics from 'expo-haptics';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../App.js';

/**
 * Scanner screen component that handles barcode scanning functionality
 * @returns {React.ReactElement} Scanner screen UI
 */
export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isActive, setIsActive] = useState(false);

  const { lastBarcode, setLastBarcode } = useContext(UserContext);
  const { colors } = useTheme();

  // Manage camera activation when screen is focused/unfocused
  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => setIsActive(false);
    }, [])
  );

  /**
   * Handles successful barcode scan events
   * @param {Object} event - The scan event object
   * @param {string} event.data - The scanned barcode data
   */
  function scanned(event) {
    setLastBarcode((prevBarcode) => {
      if (prevBarcode !== event.data) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        return event.data;
      }
      return prevBarcode;
    });
  }

  // Render permission request if camera access not granted
  if (!permission || !permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          We need your permission to show the scanner
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {isActive && (
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'],
          }}
          onBarcodeScanned={(event) => scanned(event)}
          zoom={Platform.OS === 'ios' ? 0.5 : 0}
        />
      )}
      <Text style={[styles.paragraph, { color: colors.text }]}>Last Barcode Scanned</Text>
      <Text style={[styles.paragraph, { color: colors.text }]}>
        {lastBarcode || 'No barcode scanned yet'}
      </Text>
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
