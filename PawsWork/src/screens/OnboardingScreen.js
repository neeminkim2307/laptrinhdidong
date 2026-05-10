import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/background.jpg')}
          style={styles.image}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Chào mừng đến với PawWork</Text>
        <Text style={styles.description}>
          PawsWork kết nối những người yêu thú cưng với quán cà phê thú cưng hàng đầu. Đăng ký lịch làm việc, theo dõi hoạt động, nhận lương — tất cả chỉ trong một nền tảng.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Bắt đầu ngay</Text>
        </TouchableOpacity>

        <View style={styles.footerTextContainer}>
          <Text style={styles.normalText}>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0', // Đã cập nhật màu nền mới
  },
  imageContainer: {
    flex: 1.5,
    backgroundColor: '#FFF8F0', // Đã đồng bộ màu nền
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#D4A373',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerTextContainer: {
    flexDirection: 'row', 
    marginTop: 10,
  },
  normalText: {
    fontSize: 15,
    color: '#666',
  },
  linkText: {
    fontSize: 15,
    color: 'red', 
    fontWeight: 'bold',
    textDecorationLine: 'underline', 
  },
});

export default OnboardingScreen;