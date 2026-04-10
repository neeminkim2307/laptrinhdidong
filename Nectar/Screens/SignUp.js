import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';

export default function SignUp({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>🥕</Text>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Enter your credentials to continue</Text>
      
      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} placeholder="Afsar Hossen" />
      
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="user@email.com" keyboardType="email-address" />
      
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} secureTextEntry={true} placeholder="********" />
      
      <Text style={styles.terms}>By continuing you agree to our <Text style={{color: '#53B175'}}>Terms of Service</Text> and <Text style={{color: '#53B175'}}>Privacy Policy.</Text></Text>
      
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
      
      <Text style={styles.signupText}>
        Already have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('Login')}>Login</Text>
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
  terms: { fontSize: 14, color: '#7C7C7C', marginBottom: 30, lineHeight: 22 },
  btn: { backgroundColor: '#53B175', borderRadius: 15, paddingVertical: 18, alignItems: 'center', marginBottom: 20 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  signupText: { textAlign: 'center', fontSize: 14, color: '#181725', fontWeight: '600' },
  signupLink: { color: '#53B175' }
});