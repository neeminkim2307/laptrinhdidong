import React from 'react';
import { 
  View, Text, StyleSheet, ImageBackground, 
  TouchableOpacity, StatusBar, SafeAreaView 
} from 'react-native';

export default function Onboarding({ navigation }) {
  // --- HÀM XỬ LÝ SỰ KIỆN NHẤN NÚT "GET STARTED" ---
  const handleGetStarted = () => {
    // Khi nhấn nút, sẽ điều hướng người dùng sang màn hình "Login" hoặc "HomeScreen"
    // Lưu ý: "Login" là tên màn hình bạn sẽ khai báo trong AppNavigator.js sau này
    // navigation.navigate('Login'); 
    console.log("Nút Get Started đã được nhấn!");
  };

  return (
    // SafeAreaView giúp đảm bảo nội dung không bị che khuất bởi tai thỏ hay thanh trạng thái
    <SafeAreaView style={styles.container}>
      {/* StatusBar để quản lý thanh trạng thái (pin, sóng, giờ) */}
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* --- HÌNH NỀN (IMAGEBACKGROUND) --- */}
      <ImageBackground 
        // Thay đổi đường dẫn ảnh cho đúng với file của bạn
        source={require('../assets/coffee6.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* --- KHỐI NỘI DUNG VĂN BẢN (TEXT CONTENT) --- */}
        <View style={styles.contentContainer}>
          
          {/* TIÊU ĐỀ CHÍNH (TITLE) - Kiểu chữ serif đậm */}
          <Text style={styles.titleText}>
            Fall in Love with Coffee in Blissful Delight!
          </Text>

          {/* DÒNG MIÊU TẢ PHỤ (SUBTITLE) */}
          <Text style={styles.subtitleText}>
            Welcome to our cozy coffee corner, where every cup is a delightful for you.
          </Text>

          {/* --- NÚT BẤM "GET STARTED" --- */}
          {/* TouchableOpacity tạo hiệu ứng mờ khi nhấn nút */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, // Chiếm toàn bộ màn hình
    backgroundColor: '#000' // Màu nền đen dự phòng
  },
  backgroundImage: {
    flex: 1, // Hình nền chiếm toàn bộ màn hình
    justifyContent: 'flex-end', // Đẩy nội dung xuống phía dưới của hình ảnh
  },
  contentContainer: {
    paddingHorizontal: 30, // Khoảng cách đều hai bên trái/phải
    paddingBottom: 60, // Khoảng cách từ nội dung xuống đáy màn hình
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Tạo một lớp phủ đen mờ để làm nổi bật văn bản
  },
  titleText: {
    fontSize: 42, // Chữ tiêu đề rất lớn
    fontWeight: 'bold', // Chữ đậm
    color: '#fff', // Màu chữ trắng
    textAlign: 'center', // Căn giữa chữ
    // Bạn có thể cài đặt font serif riêng cho giống hệt mẫu
    // fontFamily: 'SerifFontName', 
    lineHeight: 52, // Khoảng cách giữa các dòng chữ
    marginBottom: 15, // Khoảng cách xuống dòng miêu tả phụ
  },
  subtitleText: {
    fontSize: 18, // Chữ miêu tả phụ vừa phải
    color: '#D3D3D3', // Màu chữ xám nhạt để dễ đọc
    textAlign: 'center', // Căn giữa chữ
    lineHeight: 28, // Khoảng cách giữa các dòng chữ
    marginBottom: 45, // Khoảng cách xuống nút bấm
    fontWeight: '400',
  },
  button: {
    backgroundColor: '#C67C4E', // Màu nền nút cam đất
    borderRadius: 18, // Bo tròn góc nút
    height: 60, // Chiều cao của nút
    justifyContent: 'center', // Căn giữa nội dung bên trong nút
    alignItems: 'center',
    // Thêm đổ bóng nhẹ cho nút trông nổi bật hơn
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, // Cho Android
  },
  buttonText: {
    color: '#fff', // Màu chữ trong nút trắng
    fontSize: 20, // Chữ trong nút lớn
    fontWeight: 'bold', // Chữ đậm
  },
});