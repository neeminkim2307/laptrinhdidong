import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function SignIn({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Ảnh rau củ đổ xuống */}
      <Image source={require('../assets/man_groceries.png')} style={styles.topImage} resizeMode="contain" />
      
      <View style={styles.content}>
        <Text style={styles.title}>Get your groceries{'\n'}with nectar</Text>
        
        {/* Nút bấm giả làm ô nhập số điện thoại để chuyển màn hình */}
        <TouchableOpacity style={styles.phoneInput} onPress={() => navigation.navigate('Number')}>
          <Text style={{fontSize: 24, marginRight: 10}}>🇻🇳</Text>
          <Text style={{fontSize: 18, color: '#000'}}>+84</Text>
        </TouchableOpacity>

        <Text style={styles.or}>Or connect with social media</Text>

        {/* Nút Google màu xanh dương sáng */}
        <TouchableOpacity style={[styles.btn, styles.btnGoogle]}>
          <Text style={styles.btnText}>Continue with Google</Text>
        </TouchableOpacity>
        
        {/* Nút Facebook màu xanh đậm */}
        <TouchableOpacity style={[styles.btn, styles.btnFacebook]}>
          <Text style={styles.btnText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topImage: { width: '100%', height: 300, marginTop: -30 }, 
  content: { padding: 25 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', marginBottom: 30 },
  phoneInput: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#E2E2E2', paddingBottom: 10, marginBottom: 40 },
  or: { textAlign: 'center', color: '#828282', marginBottom: 30 },
  btn: { borderRadius: 15, paddingVertical: 18, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});