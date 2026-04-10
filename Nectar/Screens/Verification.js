import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';

export default function VerificationScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={{ fontSize: 24 }}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Enter your 4-digit code</Text>
      <Text style={styles.label}>Code</Text>
      <TextInput style={styles.input} keyboardType="number-pad" placeholder="- - - -" maxLength={4} autoFocus={true} />
      <View style={styles.bottomRow}>
        <Text style={styles.resend}>Resend Code</Text>
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('SelectLocation')}>
          <Text style={styles.fabText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25 },
  backBtn: { marginTop: 20, marginBottom: 40 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', marginBottom: 30 },
  label: { fontSize: 16, color: '#7C7C7C', marginBottom: 10 },
  input: { borderBottomWidth: 1, borderColor: '#E2E2E2', paddingBottom: 10, fontSize: 24, color: '#181725', letterSpacing: 5 },
  bottomRow: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50 },
  resend: { fontSize: 18, color: '#53B175' },
  fab: { backgroundColor: '#53B175', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  fabText: { color: '#fff', fontSize: 24, fontWeight: 'bold' }
});