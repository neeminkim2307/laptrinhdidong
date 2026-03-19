import React from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, 
  TouchableOpacity, Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Khối màu vàng bo góc nằm lót phía sau Header */}
      <View style={styles.headerBackground} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="trash-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* ================= KHU VỰC ẢNH SẢN PHẨM ================= */}
        <View style={styles.imageSection}>
          
          {/* Ảnh to và Cục 10% OFF nằm chung 1 nhà */}
          <View style={styles.mainImageContainer}>
            <Image source={require('../../assets/burgerr.png')} style={styles.mainImage} />
            
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>10%{"\n"}OFF</Text>
            </View>
          </View>

          {/* 3 Ảnh nhỏ (Thumbnails) */}
          <View style={styles.thumbnailRow}>
            <View style={styles.thumbnailContainer}>
              <Image source={require('../../assets/burger1.png')} style={styles.thumbnailImage} />
            </View>
            <View style={[styles.thumbnailContainer, styles.thumbnailActive]}>
               <Image source={require('../../assets/burger2.png')} style={styles.thumbnailImage} />
            </View>
            <View style={styles.thumbnailContainer}>
               <Image source={require('../../assets/burger3.png')} style={styles.thumbnailImage} />
            </View>
          </View>

        </View>

        {/* ================= THÔNG TIN CHI TIẾT ================= */}
        <View style={styles.detailsSection}>
          
          {/* Tên & Giá */}
          <View style={styles.titleRow}>
            <Text style={styles.productTitle}>BURGER</Text>
            <Text style={styles.productPrice}>$28</Text>
          </View>
          
          {/* Đánh giá & Số lượng */}
          <View style={styles.ratingQuantityRow}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}> 4.9 (3k+ Rating)</Text>
            </View>
            
            <View style={styles.quantityRow}>
              <TouchableOpacity><Ionicons name="remove-circle-outline" size={28} color="#A0A0A0" /></TouchableOpacity>
              <Text style={styles.quantityText}>02</Text>
              <TouchableOpacity><Ionicons name="add-circle-outline" size={28} color="#000" /></TouchableOpacity>
            </View>
          </View>

          {/* ================= CARD ĐỊA CHỈ & THANH TOÁN ================= */}
          <View style={styles.addressCard}>
            <View style={styles.addressLeft}>
              <View style={styles.iconCircleGreen}>
                <Ionicons name="location-outline" size={20} color="#555" />
              </View>
              <View style={styles.addressTextContainer}>
                <Text style={styles.addressLabel}>Delivery Address</Text>
                <Text style={styles.addressValue}>Hà Nội, Việt Nam</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="pencil" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.paymentCard}>
            <View style={styles.paymentLeft}>
              <Ionicons name="card" size={28} color="#0088FF" />
              <Text style={styles.paymentLabel}>Payment Method</Text>
            </View>
            <TouchableOpacity style={styles.changeBtn}>
              <Text style={styles.changeBtnText}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* ================= CHECKOUT SUMMARY ================= */}
          <Text style={styles.summaryTitle}>Checkout Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal (2)</Text>
            <Text style={styles.summaryValue}>$56</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>$6.20</Text>
          </View>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Payable Total</Text>
            <Text style={styles.totalValue}>$62.2</Text>
          </View>

          {/* ================= NÚT XÁC NHẬN ================= */}
          <TouchableOpacity style={styles.confirmBtn}>
            <Text style={styles.confirmBtnText}>Confirm Order</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { paddingBottom: 30 },
  
  // Nền vàng uốn lượn ở trên
  headerBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 160, backgroundColor: '#FEF9E3', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, zIndex: 0 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, zIndex: 1 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  iconBtn: { padding: 5 },
  
  // Khu vực Ảnh
  imageSection: { alignItems: 'center', marginTop: 25, zIndex: 1 },
  mainImageContainer: { width: '90%', height: 220, borderRadius: 20, overflow: 'hidden', backgroundColor: '#FFF', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10 },
  mainImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  mainImagePlaceholder: { flex: 1, backgroundColor: '#EFEFEF', justifyContent: 'center', alignItems: 'center' },
  
  discountBadge: { position: 'absolute', top: 15, left: 15, backgroundColor: '#5B44E9', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  discountText: { color: '#FFF', fontSize: 11, fontWeight: 'bold', textAlign: 'center' },
  
  // 3 Ảnh nhỏ (Kéo lùi lên trên đè vào ảnh to)
  thumbnailRow: { flexDirection: 'row', justifyContent: 'center', marginTop: -35 },
  thumbnailContainer: { width: 65, height: 65, backgroundColor: '#FFF', borderRadius: 12, marginHorizontal: 8, padding: 3, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  thumbnailActive: { shadowOpacity: 0.3, elevation: 6, transform: [{ scale: 1.05 }] },
  thumbnailImage: { width: '100%', height: '100%', borderRadius: 8, resizeMode: 'cover' },
  thumbnailPlaceholder: { flex: 1, backgroundColor: '#DDD', borderRadius: 8 },
  
  // Chi tiết sản phẩm
  detailsSection: { paddingHorizontal: 20, marginTop: 30 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productTitle: { fontSize: 26, fontWeight: '900', letterSpacing: 0.5 },
  productPrice: { fontSize: 24, fontWeight: 'bold', color: '#5B44E9' },
  
  ratingQuantityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, marginBottom: 25 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { color: '#666', fontSize: 13, marginLeft: 4, fontWeight: '500' },
  quantityRow: { flexDirection: 'row', alignItems: 'center' },
  quantityText: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 15 },
  
  // Box Địa chỉ (Màu xanh pastel)
  addressCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0F5E9', borderRadius: 15, paddingLeft: 15, height: 70, marginBottom: 15 },
  addressLeft: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  iconCircleGreen: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },
  addressTextContainer: { marginLeft: 10 },
  addressLabel: { fontSize: 12, color: '#555', marginBottom: 2 },
  addressValue: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  editBtn: { width: 60, height: '100%', backgroundColor: '#A294F9', borderTopRightRadius: 15, borderBottomRightRadius: 15, justifyContent: 'center', alignItems: 'center' },
  
  // Box Thanh toán (Màu trắng, viền nhạt)
  paymentCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF', borderRadius: 15, paddingHorizontal: 15, height: 60, marginBottom: 25, borderWidth: 1, borderColor: '#F0F0F0' },
  paymentLeft: { flexDirection: 'row', alignItems: 'center' },
  paymentLabel: { fontSize: 15, fontWeight: 'bold', marginLeft: 10 },
  changeBtn: { borderWidth: 1, borderColor: '#5B44E9', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 6 },
  changeBtnText: { color: '#5B44E9', fontSize: 12, fontWeight: 'bold' },
  
  // Tổng kết đơn hàng
  summaryTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { color: '#888', fontSize: 14, fontWeight: '500' },
  summaryValue: { fontWeight: 'bold', fontSize: 15, color: '#000' },
  
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#EEE' },
  totalLabel: { fontWeight: 'bold', fontSize: 16, color: '#000' },
  totalValue: { fontWeight: 'bold', fontSize: 18, color: '#5B44E9' },
  
  // Nút
  confirmBtn: { backgroundColor: '#5B44E9', borderRadius: 30, height: 55, justifyContent: 'center', alignItems: 'center', marginTop: 30 },
  confirmBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});