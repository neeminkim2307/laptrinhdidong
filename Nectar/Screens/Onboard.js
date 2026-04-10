import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';

export default function Onboard({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/groceries_pile.png')} 
      style={styles.bg}
      // ĐÃ THÊM: Ép ảnh căn giữa màn hình
      imageStyle={{ resizeMode: 'cover', alignSelf: 'center' }}
    >
      <StatusBar barStyle="light-content" transparent />
      <View style={styles.overlay}>
        <Text style={{fontSize: 45}}>🥕</Text>
        <Text style={styles.title}>Welcome{'\n'}to our store</Text>
        <Text style={styles.sub}>Get your groceries in as fast as one hour</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: 'flex-end' },
  overlay: { padding: 30, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', paddingBottom: 50 },
  title: { fontSize: 40, color: 'white', fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  sub: { fontSize: 16, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: 40 },
  btn: { backgroundColor: '#53B175', width: '100%', paddingVertical: 18, borderRadius: 15, alignItems: 'center' },
  btnText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});