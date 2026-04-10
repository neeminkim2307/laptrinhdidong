import React, { useEffect } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';

export default function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => { navigation.navigate('Onboard'); }, 2000); // Tự chuyển sau 2s
  },);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#53B175" />
      <Image source={require('../assets/logo1.png')} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center' },
  logo: { width: 250, height: 80 }
});