import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, 
  ScrollView, TouchableOpacity, SafeAreaView, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Thư viện icon của Expo

const DetailScreen = ({ navigation }) => {
  // State để quản lý kích cỡ được chọn (mặc định là 'M')
  const [selectedSize, setSelectedSize] = useState('M');

  const product = {
    name: 'Caffe Mocha',
    type: 'Ice/Hot',
    rating: 4.8,
    reviews: 230,
    description: 'A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo..',
    price: 4.53,
    image: require('../assets/coffee1.png'), // Thay bằng ảnh thật của bạn
  };

  const sizes = ['S', 'M', 'L'];

  // --- HÀM XỬ LÝ QUAY LẠI ---
  const handleBack = () => {
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  // --- HÀM XỬ LÝ NHẤN "BUY NOW" ---
  const handleBuyNow = () => {
    // Trong thực tế, đây là nơi bạn gọi API hoặc chuyển đến màn hình thanh toán
    console.log(`Bắt đầu mua ${product.name} - Size ${selectedSize} với giá $${product.price}`);
    alert(`Đã thêm ${product.name} (Size ${selectedSize}) vào giỏ hàng!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cấu hình thanh trạng thái */}
      <StatusBar barStyle="dark-content" />

      {/* --- CUSTOM HEADER (BACK & FAVORITE) --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#2F2D2C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="heart-outline" size={24} color="#2F2D2C" />
        </TouchableOpacity>
      </View>

      {/* --- NỘI DUNG CHÍNH (DÙNG SCROLLVIEW) --- */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HÌNH ẢNH SẢN PHẨM */}
        <Image source={product.image} style={styles.productImage} />

        {/* THÔNG TIN CHÍNH & ICON THUỘC TÍNH */}
        <View style={styles.infoRow}>
          <View style={styles.nameContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productType}>{product.type}</Text>
            {/* Đánh giá */}
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text style={styles.ratingText}> {product.rating}</Text>
              <Text style={styles.reviewsText}> ({product.reviews})</Text>
            </View>
          </View>
          
          {/* Cột các icon thuộc tính (Sửa đường dẫn require cho đúng file của bạn) */}
          <View style={styles.propertyIconsContainer}>
            <Image source={require('../assets/xemay.png')} style={styles.propertyIcon} />
            <Image source={require('../assets/hatCafe.png')} style={styles.propertyIcon} />
            <Image source={require('../assets/milk.png')} style={styles.propertyIcon} />
          </View>
        </View>

        {/* PHÂN CÁCH NẰM NGANG */}
        <View style={styles.divider} />

        {/* PHẦN MIÊU TẢ (DESCRIPTION) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {product.description}{' '}
            <Text style={styles.readMoreText}>Read More</Text>
          </Text>
        </View>

        {/* PHẦN CHỌN KÍCH CỠ (SIZE SELECTOR) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeContainer}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                // Styles thay đổi dựa trên state selectedSize
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.sizeButtonActive
                ]}
                onPress={() => setSelectedSize(size)} // Cập nhật state khi nhấn
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.sizeTextActive
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Khoảng trống cuối để không bị che bởi Bottom Bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* --- THANH THANH TOÁN (BOTTOM BAR - STAY AT BOTTOM) --- */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>$ {product.price}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#2F2D2C' },
  headerButton: { padding: 5 },
  
  // Content styles
  scrollContent: { paddingHorizontal: 30 },
  productImage: {
    width: '100%',
    height: 226,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  
  // Info & Property Icons styles
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  nameContainer: { flex: 1 },
  productName: { fontSize: 22, fontWeight: 'bold', color: '#2F2D2C' },
  productType: { fontSize: 12, color: '#9B9B9B', marginTop: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  ratingText: { fontSize: 16, fontWeight: 'bold', color: '#2F2D2C' },
  reviewsText: { fontSize: 12, color: '#808080' },
  
  propertyIconsContainer: { flexDirection: 'row', alignItems: 'center' },
  propertyIcon: { width: 44, height: 44, marginLeft: 12 },

  // Divider style
  divider: { height: 1, backgroundColor: '#EAEAEA', marginVertical: 20 },
  
  // General Section style
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2F2D2C', marginBottom: 12 },
  
  // Description styles
  descriptionText: { fontSize: 14, color: '#9B9B9B', lineHeight: 22 },
  readMoreText: { color: '#C67C4E', fontWeight: 'bold' },
  
  // Size selector styles
  sizeContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  sizeButton: {
    width: '30%',
    height: 48,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeButtonActive: { backgroundColor: '#FFF5EE', borderColor: '#C67C4E' }, // Màu nền cam nhạt khi được chọn
  sizeText: { fontSize: 14, color: '#2F2D2C' },
  sizeTextActive: { color: '#C67C4E', fontWeight: 'bold' }, // Màu chữ cam đất khi được chọn

  // Bottom payment bar styles
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 20, // Cho Android bóng đổ
    shadowColor: '#000', // Cho iOS bóng đổ
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  priceContainer: {},
  priceLabel: { fontSize: 14, color: '#9B9B9B' },
  priceValue: { fontSize: 18, fontWeight: 'bold', color: '#C67C4E', marginTop: 4 },
  buyButton: {
    backgroundColor: '#C67C4E',
    width: '65%',
    height: 62,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default DetailScreen;