import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Alert 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SecurityScreen = ({ navigation }) => {
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: ''
  });

  const handleChangePassword = () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ các trường mật khẩu.");
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp.");
      return;
    }
    Alert.alert("Thành công", "Mật khẩu của bạn đã được thay đổi!");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#5D4037" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quản lý tài khoản</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          
          <View style={styles.cardHeader}>
            <Ionicons name="lock-closed" size={20} color="#D4A373" />
            <Text style={styles.cardTitle}>Bảo Mật</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.field}>
            <Text style={styles.label}>Mật Khẩu Hiện Tại</Text>
            <TextInput 
              style={styles.input} 
              secureTextEntry={true}
              placeholder="••••••••"
              placeholderTextColor="#BCAAA4"
              onChangeText={(text) => setPasswords({...passwords, current: text})}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Mật Khẩu Mới</Text>
            <TextInput 
              style={styles.input} 
              secureTextEntry={true}
              placeholder="••••••••"
              placeholderTextColor="#BCAAA4"
              onChangeText={(text) => setPasswords({...passwords, newPass: text})}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Xác Nhận Mật Khẩu Mới</Text>
            <TextInput 
              style={styles.input} 
              secureTextEntry={true}
              placeholder="••••••••"
              placeholderTextColor="#BCAAA4"
              onChangeText={(text) => setPasswords({...passwords, confirm: text})}
            />
          </View>

          <TouchableOpacity style={styles.changeBtn} onPress={handleChangePassword}>
            <Text style={styles.changeBtnText}>Đổi Mật Khẩu</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  headerTitle: { fontSize: 16, color: '#8D6E63', fontWeight: '600' },
  backBtn: { padding: 5 },
  content: { paddingHorizontal: 20, paddingBottom: 30 },
  
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#EFEBE9' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#5D4037' },
  divider: { height: 1, backgroundColor: '#EFEBE9', marginBottom: 20 },

  field: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#5D4037', marginBottom: 6 },
  input: { backgroundColor: '#FFF8F0', borderWidth: 1, borderColor: '#EFEBE9', borderRadius: 12, padding: 14, fontSize: 14, color: '#5D4037' },
  
  // Nút viền (Outline Button) khớp với hình số 2
  changeBtn: { backgroundColor: '#FFF', borderRadius: 25, paddingVertical: 12, alignItems: 'center', marginTop: 10, alignSelf: 'flex-start', paddingHorizontal: 30, borderWidth: 1, borderColor: '#8D6E63' },
  changeBtnText: { color: '#8D6E63', fontWeight: 'bold', fontSize: 14 },
});

export default SecurityScreen;