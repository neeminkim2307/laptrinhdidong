import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Square = ({ color, label }) => {
  return (
    <View style={[styles.square, { backgroundColor: color }]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Square color="#7FDBFF" label="Square 1" />
      <Square color="#4ECDC4" label="Square 2" />
      <Square color="#FF6B6B" label="Square 3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center', // căn giữa ngang
    alignItems: 'center',     // căn giữa dọc
  },
  square: {
    width: 80,
    height: 80,
    margin: 10,
    justifyContent: 'center', // căn chữ giữa ô
    alignItems: 'center',
  },
  text: {
    color: '#333',
    fontSize: 12,
  },
});
