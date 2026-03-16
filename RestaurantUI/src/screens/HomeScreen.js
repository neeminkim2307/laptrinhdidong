import React from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, 
  TextInput, TouchableOpacity, Dimensions, Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Lấy chiều rộng màn hình để chia đều các nút danh mục
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ================= PHẦN HEADER (NỀN VÀNG CÓ BO GÓC DƯỚI) ================= */}
        <View style={styles.headerBackground}>
          <View style={styles.headerTop}>
            
            {/* Ảnh Avatar (Tạm dùng Icon) */}
            <Image 
            source={require('../../assets/avatar.jpg')} 
            style={{width: 45, height: 45, borderRadius: 22.5}} 
            />

            {/* Vị trí */}
            <View style={styles.locationContainer}>
              <Text style={styles.locationLabel}>Your Location</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={16} color="#5B44E9" />
                <Text style={styles.locationText}>Ba Đình, Hà Nội</Text>
              </View>
            </View>

            {/* Nút Chuông */}
            <TouchableOpacity style={styles.bellBtn}>
              <Ionicons name="notifications-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Thanh Tìm Kiếm */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#FFF" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search your food" 
              placeholderTextColor="#D0C9FA" 
              style={styles.searchInput} 
            />
            <TouchableOpacity>
              <Ionicons name="options-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= CATEGORIES (DANH MỤC SẢN PHẨM) ================= */}
        <View style={styles.categoriesContainer}>
          <TouchableOpacity style={[styles.categoryCard, styles.categoryActive]}>
            <Ionicons name="pizza-outline" size={30} color="#FFF" />
            <Text style={[styles.categoryText, { color: '#FFF' }]}>PIZZA</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="fast-food-outline" size={30} color="#000" />
            <Text style={styles.categoryText}>BURGER</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="wine-outline" size={30} color="#000" />
            <Text style={styles.categoryText}>DRINK</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="restaurant-outline" size={28} color="#000" />
            <Text style={styles.categoryText}>RICE</Text>
          </TouchableOpacity>
        </View>

        {/* ================= BANNER KHUYẾN MÃI (NỀN ĐEN) ================= */}
        <View style={styles.promoContainer}>
          <View style={styles.promoBanner}>
            
            {/* Nội dung chữ bên trái */}
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>BURGER</Text>
              <Text style={styles.promoSubtitle}>Today's Hot offer</Text>
              <View style={styles.ratingRow}>
                {/* 3 Avatar nhỏ chồng lên nhau */}
                <View style={styles.miniAvatarGroup}>
                  <View style={[styles.miniAvatar, { backgroundColor: '#FFD700', zIndex: 3 }]} />
                  <View style={[styles.miniAvatar, { backgroundColor: '#FF6B6B', marginLeft: -8, zIndex: 2 }]} />
                  <View style={[styles.miniAvatar, { backgroundColor: '#4D4DFF', marginLeft: -8, zIndex: 1 }]} />
                </View>
                <Ionicons name="star" size={14} color="#FFD700" style={{ marginLeft: 8 }} />
                <Text style={styles.ratingText}>4.9 (3k+ Rating)</Text>
              </View>
            </View>

            {/* Huy hiệu 10% OFF */}
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>10%{"\n"}OFF</Text>
            </View>

            {/* Chỗ để ảnh Burger to (Tạm dùng khối màu cam) */}
            <Image 
            source={require('../../assets/burger.png')} 
            style={{width: 150, height: 150, position: 'absolute', right: -20, bottom: -10, zIndex: 1}} 
            resizeMode="contain" 
            />

          </View>
        </View>

        {/* Dấu chấm chuyển slide */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* ================= DANH SÁCH POPULAR ITEMS ================= */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.popularContainer}>
          {/* Card 1 */}
          <View style={styles.popularCard}>
             {/* Chỗ để ảnh Burger nhỏ */}
             <Image 
            source={require('../../assets/burgerr.png')} 
            style={{width: '100%', height: 100, borderRadius: 10}} 
            />
             <Text style={styles.popularCardTitle}>BURGER</Text>
          </View>

          {/* Card 2 */}
          <View style={styles.popularCard}>
             {/* Chỗ để ảnh Pizza nhỏ */}
            <Image 
            source={require('../../assets/pizza.png')} 
            style={{width: '100%', height: 100, borderRadius: 10}} 
            />             
             <Text style={styles.popularCardTitle}>PIZZA</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { paddingBottom: 30 },
  
  // Nền vàng chứa Header và Search
  headerBackground: { 
    backgroundColor: '#FEF9E3', // Vàng nhạt chuẩn Figma
    borderBottomLeftRadius: 35, 
    borderBottomRightRadius: 35, 
    paddingBottom: 25,
    paddingTop: 45 // Cách tai thỏ/thanh trạng thái
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  avatarPlaceholder: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  locationContainer: { alignItems: 'center' },
  locationLabel: { fontSize: 12, color: '#888' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  locationText: { fontSize: 15, fontWeight: 'bold', marginLeft: 4, color: '#000' },
  bellBtn: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 },
  
  // Thanh Search
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#5B44E9', marginHorizontal: 20, borderRadius: 30, paddingHorizontal: 20, height: 55 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#FFF', fontSize: 16 },
  
  // Categories
  categoriesContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 25 },
  categoryCard: { width: (width - 70) / 4, height: 90, backgroundColor: '#FFF', borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05 },
  categoryActive: { backgroundColor: '#10C177' },
  categoryText: { fontSize: 12, fontWeight: 'bold', marginTop: 8, color: '#555' },
  
  // Promo Banner
  promoContainer: { paddingHorizontal: 20, marginTop: 25 },
  promoBanner: { backgroundColor: '#1E1E1E', borderRadius: 20, flexDirection: 'row', height: 140, position: 'relative', overflow: 'hidden' },
  promoContent: { flex: 1, padding: 20, justifyContent: 'center', zIndex: 2 },
  promoTitle: { color: '#FFD700', fontSize: 24, fontWeight: '900', letterSpacing: 1 },
  promoSubtitle: { color: '#FFF', fontSize: 12, marginTop: 4, marginBottom: 12 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  miniAvatarGroup: { flexDirection: 'row' },
  miniAvatar: { width: 18, height: 18, borderRadius: 9, borderColor: '#1E1E1E', borderWidth: 2 },
  ratingText: { color: '#DDD', fontSize: 11, marginLeft: 4 },
  
  // Cục 10% OFF
  discountBadge: { position: 'absolute', top: 15, right: 130, backgroundColor: '#5B44E9', width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', zIndex: 3 },
  discountText: { color: '#FFF', fontSize: 11, fontWeight: 'bold', textAlign: 'center' },
  
  // Khối vuông giả lập ảnh Burger to
  burgerImagePlaceholder: { position: 'absolute', right: -15, bottom: -15, width: 140, height: 140, backgroundColor: '#FF8C00', borderRadius: 70, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  
  // Dấu chấm
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 15 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#D9D9D9', marginHorizontal: 4 },
  dotActive: { backgroundColor: '#5B44E9', width: 16 },
  
  // Popular Items
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  viewAllText: { color: '#888', fontSize: 14, fontWeight: '500' },
  
  popularContainer: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 15, justifyContent: 'space-between' },
  popularCard: { width: '47%', backgroundColor: '#FFF', borderRadius: 15, padding: 12, alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 },
  popularImgPlaceholder: { width: '100%', height: 100, borderRadius: 10, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  popularCardTitle: { marginTop: 12, fontWeight: 'bold', fontSize: 15, color: '#000' }
});