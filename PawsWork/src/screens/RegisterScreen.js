import React from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Onboarding')}>
        <Ionicons name="chevron-back" size={28} color="#333" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/logo.png')}
            style={styles.logo} 
          />
          <Text style={styles.brandName}>PawsWork</Text>
        </View>

        <Text style={styles.sectionTitle}>Đăng Ký</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Họ tên</Text>
          <TextInput style={styles.input} placeholder="Nguyễn Văn A" />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="example@gmail.com" keyboardType="email-address" />

          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput style={styles.input} placeholder="090xxxxxxx" keyboardType="phone-pad" />

          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput style={styles.input} placeholder="Số nhà, tên đường..." />

          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput style={styles.input} placeholder="********" secureTextEntry={true} />

          <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.buttonText}>Đăng Ký ngay —</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  backButton: { padding: 20 },
  scrollContent: { paddingHorizontal: 30, paddingBottom: 40, alignItems: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 20 },
  logo: { width: 60, height: 60 },
  brandName: { fontSize: 28, fontWeight: 'bold', color: '#8D6E63', marginTop: 5 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#444', marginBottom: 20, alignSelf: 'flex-start' },
  form: { width: '100%' },
  label: { fontSize: 14, color: '#666', marginBottom: 5, fontWeight: '600' },
  input: { 
    backgroundColor: '#FFF', 
    borderWidth: 1, 
    borderColor: '#D4A373', 
    borderRadius: 12, 
    padding: 12, 
    marginBottom: 15,
    fontSize: 16
  },
  mainButton: { 
    backgroundColor: '#A67B5B', 
    padding: 18, 
    borderRadius: 20, 
    alignItems: 'center',
    marginTop: 10,
    // Đổ bóng cho nút giống ảnh
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default RegisterScreen;