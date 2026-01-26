import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

export default function App() {
  const handlePress = () => {
    Alert.alert('hello');
  };

  return (
    <View style={styles.container}>
      <Button title="Tap me" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
