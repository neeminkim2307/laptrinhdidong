import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';

export default function Login({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>🥕</Text>
      <Text style={styles.title}>Loging</Text>
      <Text style={styles.subtitle}>Enter your emails and password</Text>
      
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="user@email.com" keyboardType="email-address" />
      
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} secureTextEntry={true} placeholder="********" />
      
      <TouchableOpacity style={{alignItems: 'flex-end', marginBottom: 30}}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Log In</Text>
      </TouchableOpacity>
      
      <Text style={styles.signupText}>
        Don't have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>Signup</Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25, justifyContent: 'center' },
  logo: { fontSize: 50, textAlign: 'center', marginBottom: 40 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#7C7C7C', marginBottom: 40 },
  label: { fontSize: 16, color: '#7C7C7C', fontWeight: 'bold', marginBottom: 10 },
  input: { borderBottomWidth: 1, borderColor: '#E2E2E2', paddingBottom: 10, fontSize: 18, color: '#181725', marginBottom: 30 },
  forgot: { color: '#181725', fontSize: 14 },
  btn: { backgroundColor: '#53B175', borderRadius: 15, paddingVertical: 18, alignItems: 'center', marginBottom: 20 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  signupText: { textAlign: 'center', fontSize: 14, color: '#181725', fontWeight: '600' },
  signupLink: { color: '#53B175' }
});