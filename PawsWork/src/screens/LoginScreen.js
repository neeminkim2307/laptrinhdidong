// LoginScreen.js
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Nút Back */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Onboarding')}>
        <Ionicons name="chevron-back" size={28} color="#333" />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/logo.png')} // logo
            style={styles.logo} 
          />
          <Text style={styles.brandName}>PawsWork</Text>
        </View>

        {/* Form Card (Khung màu trắng chứa form) */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Đăng nhập vào PawsWork</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Email của bạn" 
            placeholderTextColor="#999" 
            keyboardType="email-address"
          />

          <Text style={styles.label}>Mật khẩu</Text>
          {/* Ô nhập mật khẩu liền mạch, có icon mắt */}
          <View style={styles.passwordContainer}>
            <TextInput 
              style={styles.passwordInput} 
              placeholder="********" 
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={22} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Nút Đăng nhập */}
          <TouchableOpacity 
            style={styles.mainButton}
            onPress={() => navigation.replace('Dashboard')}
          >
            <Text style={styles.buttonText}>Đăng nhập ➝</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          {/* Dòng phân cách */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>hoặc đăng nhập bằng</Text>
            <View style={styles.line} />
          </View>

          {/* Social Login */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#E00000' }]}>
              <Ionicons name="logo-google" size={20} color="#FFF" />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1877F2' }]}>
              <Ionicons name="logo-facebook" size={20} color="#FFF" />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF8F0' // Màu nền kem của toàn app
  }, 
  backButton: { 
    padding: 20, 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    zIndex: 1 
  },
  content: { 
    paddingHorizontal: 20, 
    alignItems: 'center', 
    paddingTop: 50 
  },
  logoContainer: { 
    alignItems: 'center', 
    marginBottom: 20 
  },
  logo: { 
    width: 70, 
    height: 70 
  },
  brandName: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#8C6C58', // Màu nâu chữ PawsWork
    marginTop: 10 
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 25,
    // Đổ bóng cho nguyên cái khung trắng
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#5D4037', 
    marginBottom: 25,
  },
  label: { 
    fontSize: 13, 
    color: '#705341', 
    marginBottom: 5, 
    fontWeight: 'bold' 
  },
  input: { 
    backgroundColor: '#FFF8F0', // Nền ô input giống hình
    borderWidth: 1, 
    borderColor: '#BCAAA4', // Viền nâu nhạt
    borderRadius: 12, 
    padding: 14, 
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    // Đổ bóng dưới ô input
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  passwordContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF8F0', // Nền ô input giống hình
    borderWidth: 1, 
    borderColor: '#BCAAA4', 
    borderRadius: 12, 
    marginBottom: 25,
    // Đổ bóng dưới ô input mật khẩu
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  passwordInput: { 
    flex: 1,
    padding: 14, 
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  mainButton: { 
    backgroundColor: '#7A5C4D', // Màu nút nâu đậm
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  forgotButton: {
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotText: { 
    color: '#333', 
    fontSize: 14,
    fontWeight: '500'
  },
  dividerContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  line: { 
    flex: 1, 
    height: 1, 
    backgroundColor: '#E0E0E0' 
  },
  dividerText: { 
    marginHorizontal: 10, 
    color: '#666', 
    fontSize: 12 
  },
  socialRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  socialButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '48%', 
    paddingVertical: 12, 
    borderRadius: 12 
  },
  socialText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    marginLeft: 8 
  },
});

export default LoginScreen;