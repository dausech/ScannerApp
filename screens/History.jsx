import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList, Button } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@react-navigation/native';
import { UserContext } from '../App.js';

/**
 * History screen component that displays and manages scanned barcodes
 * @returns {React.ReactElement} History screen UI
 */
export default function CopyBox() {
  const { colors } = useTheme();
  const { lastBarcode } = useContext(UserContext);
  
  const [list, setList] = useState([]);
  const [nextId, setNextId] = useState(1);

  // Add new barcodes to history when scanned
  useEffect(() => {
    if (lastBarcode) {
      setList([...list, { id: nextId, text: lastBarcode }]);
      setNextId(nextId + 1);
    }
  }, [lastBarcode]);
  
  /**
   * Shows confirmation dialog and clears the barcode history
   */
  function clearList() {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to clear the list?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => setList([]),
          style: "destructive",
        },
      ]
    );
  }

  /**
   * Copies text to clipboard and shows confirmation
   * @param {string} text - Text to copy to clipboard
   */
  function copy(text) {
    Clipboard.setStringAsync(text);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Copied!", "Text has been copied to clipboard.");
  }

  /**
   * Removes an item from the history list
   * @param {number} id - ID of the item to delete
   */
  function deleteItem(id) {
    setList((prevList) => prevList.filter(item => item.id !== id));
  }

  /**
   * Individual list item component
   * @param {Object} props - Component props
   * @param {string} props.text - Barcode text to display
   * @param {number} props.id - Unique identifier for the item
   * @returns {React.ReactElement} List item UI
   */
  function ListItem({ text, id }) {
    return (
      <View style={styles.listItemContainer}> 
        <TouchableOpacity onPress={() => copy(text)} style={styles.box}>
          <Text style={[styles.text, { color: colors.text }]}>{text}</Text>
          <Icon name="copy-outline" size={20} color="gray" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteItem(id)} style={styles.trashButton}>
          <Icon name="trash-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    );
  }

  if (list.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={[ styles.paragraph, { color: colors.text } ]}>Nothing scanned yet!</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem text={item.text} id={item.id} />}
        contentContainerStyle={styles.listContainer}
      />
      <Button 
        title="Clear" 
        onPress={() => clearList()}
        style={styles.clearButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  listContainer: {
    paddingVertical: 10,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '90%',
    alignSelf: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  trashButton: {
    padding: 10,
  },
  clearButton: {
    margin: 10,
  },
});
