import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNav from '../components/BottomNav'; // Import component thanh điều hướng dùng chung

const mockBookings = [
  { id: '1', pet: 'Mochi', time: 'Ca 1: 9h-13h', date: '2025-05-07', status: 'Xác nhận', avatarLetter: 'M', avatarColor: '#FFE0B2', isUpcoming: true },
  { id: '2', pet: 'Pudding', time: 'Ca 2: 13h-17h', date: '2025-05-07', status: 'Xác nhận', avatarLetter: 'P', avatarColor: '#FFCDD2', isUpcoming: true },
  { id: '3', pet: 'Kiwi', time: 'Ca 3: 17h-21h', date: '2025-05-09', status: 'Xác nhận', avatarLetter: 'K', avatarColor: '#C8E6C9', isUpcoming: true },
  { id: '4', pet: 'Mochi', time: 'Ca 1: 9h-13h', date: '2025-05-12', status: 'Xác nhận', avatarLetter: 'M', avatarColor: '#FFE0B2', isUpcoming: true },
  { id: '5', pet: 'Mochi', time: 'Ca 2: 13h-17h', date: '2025-04-28', status: 'Hoàn thành', avatarLetter: 'M', avatarColor: '#FFE0B2', isUpcoming: false },
  { id: '6', pet: 'Kiwi', time: 'Ca 1: 9h-13h', date: '2025-04-25', status: 'Hoàn thành', avatarLetter: 'K', avatarColor: '#C8E6C9', isUpcoming: false },
];

const filters = ['Tất cả', 'Sắp tới', 'Hoàn thành'];

const BookingListScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const filteredBookings = mockBookings.filter(item => {
    if (activeFilter === 'Sắp tới') return item.isUpcoming;
    if (activeFilter === 'Hoàn thành') return !item.isUpcoming;
    return true; // 'Tất cả'
  });

  const renderBookingItem = (item) => (
    <View key={item.id} style={styles.bookingCard}>
      <View style={[styles.avatarBox, { backgroundColor: item.avatarColor }]}>
        <Text style={styles.avatarText}>{item.avatarLetter}</Text>
      </View>
      <View style={styles.bookingInfo}>
        <Text style={styles.petName}>{item.pet}</Text>
        <Text style={styles.bookingDetail}>{item.time}</Text>
        <Text style={styles.bookingDetail}>{item.date}</Text>
      </View>
      <View style={styles.bookingRight}>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Hoàn thành' ? '#E3F2FD' : '#E8F5E9' }]}>
          <Text style={[styles.statusText, { color: item.status === 'Hoàn thành' ? '#2196F3' : '#4CAF50' }]}>
            {item.status}
          </Text>
        </View>
        {item.isUpcoming && (
          <TouchableOpacity style={styles.cancelBtn}>
            <Ionicons name="close" size={16} color="#F44336" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Lịch Đã Đặt</Text>

        {/* Hàng chứa Filters và nút "Đặt Lịch" */}
        <View style={styles.filterActionRow}>
          <View style={styles.filterRow}>
            {filters.map((f, i) => (
              <TouchableOpacity 
                key={i} 
                style={[styles.filterBtn, activeFilter === f && styles.filterBtnActive]}
                onPress={() => setActiveFilter(f)}
              >
                <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* NÚT ĐẶT LỊCH DẠNG TEXT */}
          <TouchableOpacity onPress={() => navigation.navigate('BookingForm')}>
            <Text style={styles.actionText}>+ Đặt lịch</Text>
          </TouchableOpacity>
        </View>

        {/* List */}
        <View style={styles.listContainer}>
          {filteredBookings.map(renderBookingItem)}
        </View>
      </ScrollView>

      <BottomNav activeTab="Calendar" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 }, // Giảm paddingBottom vì đã bỏ nút to
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#5D4037', marginBottom: 15 },
  
  // Hàng ngang bọc bộ lọc và nút đặt lịch
  filterActionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  filterRow: { flexDirection: 'row', flex: 1 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EFEBE9', marginRight: 10 },
  filterBtnActive: { backgroundColor: '#8D6E63', borderColor: '#8D6E63' },
  filterText: { fontSize: 13, color: '#8D6E63', fontWeight: '500' },
  filterTextActive: { color: '#FFF', fontWeight: 'bold' },
  
  // Style cho chữ Đặt lịch giống chữ "Xem tất cả"
  actionText: { fontSize: 14, color: '#D4A373', fontWeight: '600' },

  listContainer: { backgroundColor: '#FFF', borderRadius: 20, borderWidth: 1, borderColor: '#EFEBE9', overflow: 'hidden', padding: 15 },
  bookingCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  avatarBox: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  bookingInfo: { flex: 1 },
  petName: { fontSize: 16, fontWeight: 'bold', color: '#4E342E', marginBottom: 2 },
  bookingDetail: { fontSize: 12, color: '#8D6E63', marginBottom: 2 },
  bookingRight: { alignItems: 'flex-end', justifyContent: 'space-between', height: 45 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginBottom: 5 },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  cancelBtn: { padding: 2 },
});

export default BookingListScreen;