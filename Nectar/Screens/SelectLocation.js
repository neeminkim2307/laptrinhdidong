import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';

export default function SelectLocation({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={{ fontSize: 24 }}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={{fontSize: 80, textAlign: 'center', marginBottom: 20}}>🗺️</Text>
        <Text style={styles.title}>Select Your Location</Text>
        <Text style={styles.subtitle}>Switch on your location to stay in tune with what's happening in your area</Text>
        
        <Text style={styles.label}>Your Zone</Text>
        <TextInput style={styles.input} placeholder="Banasree" />
        
        <Text style={styles.label}>Your Area</Text>
        <TextInput style={styles.input} placeholder="Types of your area" />
        
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25 },
  backBtn: { marginTop: 20, marginBottom: 10 },
  content: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', textAlign: 'center', marginBottom: 15 },
  subtitle: { fontSize: 16, color: '#7C7C7C', textAlign: 'center', marginBottom: 40 },
  label: { fontSize: 16, color: '#7C7C7C', fontWeight: 'bold', marginBottom: 10 },
  input: { borderBottomWidth: 1, borderColor: '#E2E2E2', paddingBottom: 10, fontSize: 18, color: '#181725', marginBottom: 30 },
  btn: { backgroundColor: '#53B175', borderRadius: 15, paddingVertical: 18, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});