import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding'); 
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>PawWork</Text>
      <Text style={styles.subtitle}>Love your pets</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0', // Đã cập nhật màu nền mới
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#D4A373', 
  },
  subtitle: {
    fontSize: 16,
    color: '#8D6E63',
    marginTop: 8,
    letterSpacing: 1.5,
  }
});

export default SplashScreen;