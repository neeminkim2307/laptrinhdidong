import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNav from '../components/BottomNav'; // Import thanh điều hướng dùng chung

// ==========================================
// MOCK DATA
// ==========================================
const mockPetsData = [
  { 
    id: '1', name: 'Mochi', breed: 'Mèo Anh Lông Ngắn', age: '2', type: 'Mèo', 
    rating: '4.9', shifts: '48', status: 'Đang Làm', 
    avatarLetter: 'M', avatarColor: '#FFB89E', 
    statusBg: '#E8F5E9', statusText: '#4CAF50', dotColor: '#4CAF50' 
  },
  { 
    id: '2', name: 'Kiwi', breed: 'Mèo Ragdoll', age: '3', type: 'Mèo', 
    rating: '4.7', shifts: '32', status: 'Đang Ở', 
    avatarLetter: 'K', avatarColor: '#A8E6CF', 
    statusBg: '#E3F2FD', statusText: '#2196F3', dotColor: '#42A5F5' 
  },
  { 
    id: '3', name: 'Pudding', breed: 'Chó Corgi', age: '1', type: 'Chó', 
    rating: '4.8', shifts: '24', status: 'Đang Làm', 
    avatarLetter: 'P', avatarColor: '#FFC8DD', 
    statusBg: '#E8F5E9', statusText: '#4CAF50', dotColor: '#4CAF50' 
  },
  { 
    id: '4', name: 'Boba', breed: 'Mèo Vàng', age: '1', type: 'Mèo', 
    rating: '—', shifts: '0', status: 'Chờ Duyệt', 
    avatarLetter: 'B', avatarColor: '#A2D2FF', 
    statusBg: '#FFF3E0', statusText: '#FF9800', dotColor: '#FF9800' 
  },
];

const filterOptions = ['Tất Cả', 'Đang Làm', 'Đang Ở', 'Chờ Duyệt'];

// ==========================================
// COMPONENT CHÍNH
// ==========================================
const PetsScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('Tất Cả');

  // Lọc danh sách thú cưng dựa trên filter đang chọn
  const filteredPets = activeFilter === 'Tất Cả' 
    ? mockPetsData 
    : mockPetsData.filter(pet => pet.status === activeFilter);

  // Component Thẻ Thú Cưng
  const renderPetCard = (pet) => (
    <TouchableOpacity
  key={pet.id}
  style={styles.card}
  onPress={() => navigation.navigate('PetDetail', { pet })}
>

      {/* Avatar & Dot */}
      <View style={styles.avatarContainer}>
        <View style={[styles.avatarBox, { backgroundColor: pet.avatarColor }]}>
          <Text style={styles.avatarLetter}>{pet.avatarLetter}</Text>
        </View>
        <View style={[styles.statusDot, { backgroundColor: pet.dotColor }]} />
      </View>

      {/* Badge Trạng thái */}
      <View style={[styles.badge, { backgroundColor: pet.statusBg }]}>
        <Text style={[styles.badgeText, { color: pet.statusText }]}>{pet.status}</Text>
      </View>

      {/* Thông tin cơ bản */}
      <Text style={styles.petName} numberOfLines={1}>{pet.name}</Text>
      <Text style={styles.petBreed} numberOfLines={1}>{pet.breed}</Text>
      <Text style={styles.petAge}>{pet.age} tuổi · {pet.type}</Text>

      {/* Footer: Rating & Ca làm */}
      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <Ionicons name="star-outline" size={12} color="#FF9800" />
          <Text style={styles.footerText}>{pet.rating}</Text>
        </View>
        <View style={styles.footerItem}>
          <Ionicons name="time-outline" size={12} color="#8D6E63" />
          <Text style={styles.footerText}>{pet.shifts} ca</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Thú Cưng Của Tôi</Text>
            <Text style={styles.headerSubtitle}>{mockPetsData.length} thú cưng đã đăng ký</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('AddPet')}>
            <Ionicons name="add" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Thanh Lọc Trạng Thái (Filters) */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterContainer}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {filterOptions.map((option, index) => {
            const isActive = activeFilter === option;
            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.filterBtn, isActive && styles.filterBtnActive]}
                onPress={() => setActiveFilter(option)}
              >
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Grid Danh sách Thú Cưng */}
        <View style={styles.gridContainer}>
          {filteredPets.map(renderPetCard)}
        </View>

      </ScrollView>

      {/* ========================================== */}
      {/* THANH ĐIỀU HƯỚNG DÙNG CHUNG */}
      {/* Truyền activeTab là "Pets" để icon sáng lên */}
      {/* ========================================== */}
      <BottomNav activeTab="Pets" navigation={navigation} />

    </SafeAreaView>
  );
};

// ==========================================
// STYLES
// ==========================================
const { width } = Dimensions.get('window');
const cardWidth = (width - 40 - 15) / 2; // (Tổng width - padding 2 bên - khoảng cách giữa 2 thẻ) / 2

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100, paddingTop: 20 },
  
  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#5D4037', marginBottom: 4 },
  headerSubtitle: { fontSize: 13, color: '#8D6E63' },
  addButton: { 
    backgroundColor: '#EAA871', width: 45, height: 45, borderRadius: 22.5, 
    justifyContent: 'center', alignItems: 'center',
    shadowColor: "#EAA871", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 4
  },

  // Filters
  filterContainer: { flexDirection: 'row', marginBottom: 20 },
  filterBtn: { 
    paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, 
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EFEBE9', marginRight: 10,
    justifyContent: 'center', alignItems: 'center'
  },
  filterBtnActive: { backgroundColor: '#8D6E63', borderColor: '#8D6E63' },
  filterText: { fontSize: 13, color: '#8D6E63', fontWeight: '500' },
  filterTextActive: { color: '#FFF', fontWeight: 'bold' },

  // Grid
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  
  // Pet Card
  card: { 
    width: cardWidth, backgroundColor: '#FFF', borderRadius: 20, padding: 15, marginBottom: 15,
    alignItems: 'center', borderWidth: 1, borderColor: '#F5F5F5',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  avatarContainer: { position: 'relative', marginBottom: 10 },
  avatarBox: { width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center' },
  avatarLetter: { fontSize: 28, fontWeight: 'bold', color: '#FFF' },
  statusDot: { 
    position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, 
    borderRadius: 7, borderWidth: 2, borderColor: '#FFF' 
  },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 10 },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  petName: { fontSize: 16, fontWeight: 'bold', color: '#4E342E', marginBottom: 4 },
  petBreed: { fontSize: 11, color: '#8D6E63', marginBottom: 2 },
  petAge: { fontSize: 11, color: '#A1887F', marginBottom: 12 },
  
  cardFooter: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 10 },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerText: { fontSize: 11, color: '#8D6E63', fontWeight: '500' }
});

export default PetsScreen;