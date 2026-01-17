import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,
  TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.title}>Đăng nhập</Text>

      {/* Nội dung */}
      <View style={styles.content}>
        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.desc}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
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

  buttonText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '500',
  },
});

