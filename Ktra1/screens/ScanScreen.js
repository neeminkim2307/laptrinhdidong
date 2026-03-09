import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Import thư viện icon (Ionicons cho nút Back, AntDesign cho nút +)
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function ScanScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {}
      <ImageBackground 
        source={require('../assets/images/product.png')} 
        style={styles.bgImage}
        resizeMode="cover"
      >
        {/* Nút Back quay lại Home */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#5D78FF" />
        </TouchableOpacity>

        {/* Khung quét mã */}
        <View style={styles.scanFrame}></View>

        {/* KHỐI THÔNG TIN MỚI CÓ NÚT (+) */}
        <View style={styles.infoBox}>
          
          {/* 1. Ảnh nhỏ bên trái */}
          <View style={styles.thumbContainer}>
            <Image 
              source={require('../assets/images/product.png')} // Dùng luôn ảnh chai nước làm ảnh nhỏ
              style={styles.thumbnail}
              resizeMode="contain"
            />
          </View>

          {/* 2. Chữ ở giữa */}
          <View style={styles.textContainer}>
            <Text style={styles.brand}>Lauren's</Text>
            <Text style={styles.pName}>Orange Juice</Text>
          </View>

          {/* 3. Nút Dấu Cộng (+) bên phải */}
          <TouchableOpacity style={styles.addBtn}>
            <AntDesign name="plus" size={24} color="#1d1fbd" />
          </TouchableOpacity>

        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgImage: { flex: 1, padding: 30, justifyContent: 'space-between' },
  
  // Style nút Back
  backBtn: { width: 45, height: 45, backgroundColor: '#fff', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 30 },
  
  // Style Khung quét
  scanFrame: { width: 250, height: 350, alignSelf: 'center', borderStyle: 'dashed', borderWidth: 3, borderColor: '#fff', borderRadius: 30 },
  
  // Style Khối thông tin mới
  infoBox: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 15, 
    marginBottom: 20,
    flexDirection: 'row', // Sắp xếp theo chiều ngang
    alignItems: 'center', // Căn giữa theo chiều dọc
    justifyContent: 'space-between' 
  },
  
  // Khung chứa ảnh nhỏ
  thumbContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F3EAD3', // Màu nền nhạt phía sau chai nước thu nhỏ
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  thumbnail: { width: 30, height: 40 },
  
  // Khung chứa chữ
  textContainer: { flex: 1 },
  brand: { color: '#B0B0B0', fontSize: 13, marginBottom: 2 },
  pName: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  
  // Nút Cộng
  addBtn: { 
    width: 45, 
    height: 45, 
    backgroundColor: '#5D78FF', // Màu xanh tím giống Figma
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});