import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';

export default function App() {
  const [phone, setPhone] = useState('');

  // bắt buộc 0 + 9 số = 10 số
  const isValidPhone = /^0\d{9}$/.test(phone);

  const handleContinue = () => {
    if (isValidPhone) {
      alert('Số điện thoại hợp lệ');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <View style={styles.content}>
        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.desc}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="phone-pad"
          value={phone}
          maxLength={10}
          onChangeText={(text) => {
            const onlyNumber = text.replace(/[^0-9]/g, '');
            setPhone(onlyNumber);
          }}
        />

        <TouchableOpacity
          style={[
            styles.button,
            isValidPhone && styles.buttonActive,
          ]}
          disabled={!isValidPhone}
          onPress={handleContinue}
        >
          <Text
            style={[
              styles.buttonText,
              isValidPhone && styles.buttonTextActive,
            ]}
          >
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
  },

  content: {
    paddingHorizontal: 24,
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },

  desc: {
    fontSize: 13,
    color: '#777',
    marginBottom: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 40,
  },

  button: {
    backgroundColor: '#eee',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },

  buttonActive: {
    backgroundColor: '#4ECDC4', // xanh khi hợp lệ
  },

  buttonText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '500',
  },

  buttonTextActive: {
    color: '#fff',
  },
});
