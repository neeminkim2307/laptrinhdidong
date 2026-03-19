import React, { useState, useContext } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, Alert, ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Vẫn gọi đúng cái trạm phát sóng AuthContext của tụi mình
import { AuthContext } from '../context/AuthContext'; 

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false); // Trạng thái hiện dòng chữ đỏ
  
  // Rút hàm login từ Context ra
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    // Nếu để trống -> Hiện chữ đỏ "Vui lòng điền đầy đủ thông tin"
    if (!email || !password) {
      setShowError(true);
      return;
    }
    setShowError(false);

    // Dùng đúng luồng cũ: tài khoản 'admin', pass '123' thì cho vào
    const success = login(email, password);
    if (!success) {
      Alert.alert("Lỗi đăng nhập", "Tài khoản hoặc mật khẩu không đúng!\n(Gợi ý: admin / 123)");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        
        {/* === HEADER VÀNG PASTEL === */}
        <View style={styles.headerBackground}>
          <Text style={styles.title}>Đăng Nhập</Text>
          <Text style={styles.subtitle}>Chào mừng bạn quay trở lại!</Text>
        </View>

        {/* === KHU VỰC NHẬP LIỆU === */}
        <View style={styles.formContainer}>
          
          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputBox}>
            <TextInput 
              style={styles.input}
              placeholder="Nhập email của bạn"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={(text) => { setEmail(text); setShowError(false); }}
              autoCapitalize="none"
            />
          </View>

          {/* Mật khẩu */}
          <Text style={styles.label}>Mật khẩu</Text>
          <View style={styles.inputBox}>
            <TextInput 
              style={styles.input}
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={(text) => { setPassword(text); setShowError(false); }}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 5 }}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#888" />
            </TouchableOpacity>
          </View>

          {/* Dòng chữ báo lỗi màu đỏ (Giống trong hình) */}
          {showError && <Text style={styles.errorText}>Vui lòng điền đầy đủ thông tin</Text>}

          {/* Quên mật khẩu */}
          <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 15 }}>
            <Text style={styles.forgotPass}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          {/* Nút Đăng Nhập Xanh Tím */}
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Đăng Nhập</Text>
          </TouchableOpacity>

          {/* Đăng ký ngay */}
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Chưa có tài khoản? </Text>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>

          {/* HOẶC */}
          <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>hoặc</Text>
            <View style={styles.line} />
          </View>

          {/* Mạng Xã Hội */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="logo-google" size={20} color="#DB4437" />
              <Text style={styles.socialBtnText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="logo-facebook" size={20} color="#1877F2" />
              <Text style={styles.socialBtnText}>Facebook</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  
  // Khung vàng ở trên
  headerBackground: { 
    backgroundColor: '#FFFFE0', // Vàng nhạt y hệt thiết kế
    height: 220, 
    borderBottomLeftRadius: 40, 
    borderBottomRightRadius: 40, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 30
  },
  title: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#888' },

  // Form nhập liệu
  formContainer: { paddingHorizontal: 25, marginTop: 30 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8, marginTop: 15 },
  inputBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F5F6F8', // Xám nhạt
    borderRadius: 12, 
    paddingHorizontal: 15, 
    height: 55 
  },
  input: { flex: 1, fontSize: 15, color: '#333' },
  
  errorText: { color: '#FF4D4F', fontSize: 13, marginTop: 8 },
  forgotPass: { color: '#5B44E9', fontSize: 14, fontWeight: '600' },

  // Nút bấm
  loginBtn: { 
    backgroundColor: '#4A3AF0', 
    borderRadius: 30, 
    height: 55, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 35,
    elevation: 2, shadowColor: '#4A3AF0', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5
  },
  loginBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

  // Text ở dưới
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  registerText: { color: '#888', fontSize: 14 },
  registerLink: { color: '#4A3AF0', fontSize: 14, fontWeight: 'bold' },

  orRow: { flexDirection: 'row', alignItems: 'center', my: 25, marginTop: 30, marginBottom: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#EEE' },
  orText: { marginHorizontal: 15, color: '#AAA', fontSize: 14 },

  socialRow: { flexDirection: 'row', justifyContent: 'space-between' },
  socialBtn: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', 
    backgroundColor: '#F5F6F8', width: '47%', height: 50, borderRadius: 12 
  },
  socialBtnText: { fontSize: 15, fontWeight: '600', color: '#333', marginLeft: 8 }
});