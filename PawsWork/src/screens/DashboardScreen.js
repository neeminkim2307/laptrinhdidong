// DashboardScreen.js
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNav from '../components/BottomNav'; // Import component thanh điều hướng

// ==========================================
// MOCK DATA (Dữ liệu cứng chờ gắn API)
// ==========================================
const mockData = {
  user: { name: 'Linh' },
  stats: [
    { id: '1', title: 'Lịch Hoạt Động', value: '4', icon: 'calendar-outline', bgColor: '#FFF2E0', iconColor: '#D4A373', textColor: '#8D6E63' },
    { id: '2', title: 'Số Dư Ví', value: 'đ840K', icon: 'card-outline', bgColor: '#E8F5E9', iconColor: '#4CAF50', textColor: '#2E7D32' },
    { id: '3', title: 'Thú Cưng', value: '4', icon: 'heart-outline', bgColor: '#FCE4EC', iconColor: '#E91E63', textColor: '#C2185B' },
    { id: '4', title: 'Đánh Giá TB', value: '4.8', icon: 'star-outline', bgColor: '#E3F2FD', iconColor: '#2196F3', textColor: '#1565C0' },
  ],
  schedules: [
    { id: '1', petName: 'Mochi', time: 'Ca 1: 9h-13h', status: 'Xác nhận', statusColor: '#E8F5E9', statusTextColor: '#4CAF50', avatarLetter: 'M', avatarColor: '#FFE0B2' },
    { id: '2', petName: 'Pudding', time: 'Ca 2: 13h-17h', status: 'Xác nhận', statusColor: '#E8F5E9', statusTextColor: '#4CAF50', avatarLetter: 'P', avatarColor: '#FFCDD2' },
  ],
  myPets: [
    { id: '1', petName: 'Mochi', breed: 'Mèo Anh Lông Ngắn', rating: '4.9', status: 'Đang Làm', statusColor: '#E8F5E9', statusTextColor: '#4CAF50', avatarLetter: 'M', avatarColor: '#FFE0B2' },
    { id: '2', petName: 'Kiwi', breed: 'Mèo Ragdoll', rating: '4.7', status: 'Đang Ở', statusColor: '#E3F2FD', statusTextColor: '#2196F3', avatarLetter: 'K', avatarColor: '#C8E6C9' },
  ],
  notifications: [
    { id: '1', type: 'calendar', title: 'Đã đăng ký lịch thành công — Mochi Ca 1 ngày 18/04', time: '2 phút trước', isRead: false },
    { id: '2', type: 'money', title: 'Đã nhận được +120,000đ — Thanh toán ca làm Pudding tháng 4', time: '1 giờ trước', isRead: false },
    { id: '3', type: 'cancel', title: 'Đã hủy lịch làm thành công — Bông Ca 3 ngày 17/04', time: '3 giờ trước', isRead: true },
    { id: '4', type: 'star', title: 'Mochi nhận được đánh giá 5 sao từ khách hàng Minh Anh', time: '1 ngày trước', isRead: true },
    { id: '5', type: 'paw', title: 'Trà Sữa đang chờ xét duyệt — Hoàn thiện hồ sơ tiêm chủng', time: '2 ngày trước', isRead: true },
  ]
};

// ==========================================
// COMPONENT CHÍNH
// ==========================================
const DashboardScreen = ({ navigation }) => {
  const [showNotification, setShowNotification] = useState(false);

  // Helper: Chọn màu/icon cho thông báo
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'calendar': return { name: 'calendar', color: '#7B61FF', bg: '#F0F0FF' };
      case 'money': return { name: 'cash', color: '#FF9800', bg: '#FFF4E5' };
      case 'cancel': return { name: 'close', color: '#F44336', bg: '#FFEBEB' };
      case 'star': return { name: 'star', color: '#FFC107', bg: '#FFF8E1' };
      case 'paw': return { name: 'paw', color: '#795548', bg: '#EFEBE9' };
      default: return { name: 'notifications', color: '#999', bg: '#EEE' };
    }
  };

  // Helper: Hiển thị 4 thẻ thống kê
  const renderStatCard = (item) => (
    <View key={item.id} style={[styles.statCard, { backgroundColor: item.bgColor }]}>
      <Ionicons name={item.icon} size={24} color={item.iconColor} style={styles.statIcon} />
      <Text style={[styles.statValue, { color: item.textColor }]}>{item.value}</Text>
      <Text style={[styles.statTitle, { color: item.textColor }]}>{item.title}</Text>
    </View>
  );

  // Helper: Hiển thị dòng danh sách (Lịch / Thú cưng)
  const renderListItem = (item, type) => (
    <View key={item.id} style={styles.listItem}>
      <View style={[styles.avatarBox, { backgroundColor: item.avatarColor }]}>
        <Text style={styles.avatarText}>{item.avatarLetter}</Text>
      </View>
      <View style={styles.listInfo}>
        <Text style={styles.listTitle}>{item.petName}</Text>
        <Text style={styles.listSubtitle}>{type === 'schedule' ? item.time : item.breed}</Text>
      </View>
      <View style={styles.listRightContent}>
        {type === 'pet' && <Text style={styles.ratingText}>⭐ {item.rating}</Text>}
        <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
          <Text style={[styles.statusText, { color: item.statusTextColor }]}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* ScrollView Chính của trang */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Xin chào, {mockData.user.name} 👋</Text>
            <Text style={styles.subGreeting}>Hôm nay thú cưng của bạn thế nào?</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.notificationBtn}
            onPress={() => setShowNotification(!showNotification)}
          >
            <Ionicons name="notifications-outline" size={24} color="#5D4037" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {mockData.stats.map(renderStatCard)}
        </View>

        {/* Lịch Hôm Nay */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lịch Hôm Nay</Text>
            <TouchableOpacity><Text style={styles.seeAllText}>Xem tất cả</Text></TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            {mockData.schedules.map(item => renderListItem(item, 'schedule'))}
          </View>
        </View>

        {/* Thú Cưng Của Tôi */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thú Cưng Của Tôi</Text>
            <TouchableOpacity><Text style={styles.seeAllText}>Xem tất cả</Text></TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            {mockData.myPets.map(item => renderListItem(item, 'pet'))}
          </View>
        </View>

      </ScrollView>

      {/* ========================================== */}
      {/* BẢNG THÔNG BÁO NỔI (POPUP) */}
      {/* ========================================== */}
      {showNotification && (
        <View style={styles.notificationPopup}>
          <View style={styles.notifHeaderRow}>
            <Text style={styles.notifHeaderTitle}>Thông Báo</Text>
          </View>

          <ScrollView style={styles.notifListScroll} showsVerticalScrollIndicator={false}>
            {mockData.notifications.map((notif) => {
              const iconStyle = getNotificationIcon(notif.type);
              return (
                <View key={notif.id} style={[styles.notifItem, !notif.isRead && styles.notifItemUnread]}>
                  <View style={[styles.notifIconBox, { backgroundColor: iconStyle.bg }]}>
                    <Ionicons name={iconStyle.name} size={18} color={iconStyle.color} />
                  </View>
                  <View style={styles.notifTextContainer}>
                    <Text style={styles.notifTitle} numberOfLines={2}>{notif.title}</Text>
                    <Text style={styles.notifTime}>{notif.time}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>

        </View>
      )}

      {/* ========================================== */}
      {/* THANH ĐIỀU HƯỚNG DÙNG CHUNG */}
      {/* ========================================== */}
      <BottomNav activeTab="Dashboard" navigation={navigation} />

    </SafeAreaView>
  );
};

// ==========================================
// STYLES
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100, paddingTop: 20 }, // paddingBottom lớn hơn để không bị BottomNav che
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#5D4037', marginBottom: 5 },
  subGreeting: { fontSize: 14, color: '#8D6E63' },
  notificationBtn: { backgroundColor: '#FFF', padding: 10, borderRadius: 50, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  notificationDot: { position: 'absolute', top: 10, right: 12, width: 8, height: 8, backgroundColor: '#FF5252', borderRadius: 4, borderWidth: 1, borderColor: '#FFF' },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 25 },
  statCard: { width: '48%', borderRadius: 20, padding: 18, marginBottom: 15 },
  statIcon: { marginBottom: 10 },
  statValue: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  statTitle: { fontSize: 13, fontWeight: '600' },

  section: { marginBottom: 25 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#5D4037' },
  seeAllText: { fontSize: 14, color: '#D4A373', fontWeight: '600' },
  
  listContainer: { backgroundColor: '#FFF', borderRadius: 20, borderWidth: 1, borderColor: '#EFEBE9', overflow: 'hidden' },
  listItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  avatarBox: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  listInfo: { flex: 1 },
  listTitle: { fontSize: 16, fontWeight: 'bold', color: '#4E342E', marginBottom: 4 },
  listSubtitle: { fontSize: 13, color: '#8D6E63' },
  listRightContent: { alignItems: 'flex-end' },
  ratingText: { fontSize: 12, color: '#FFB300', fontWeight: 'bold', marginBottom: 5 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: 'bold' },

  // Thông báo nổi (Popup)
  notificationPopup: {
    position: 'absolute', top: 80, right: 20, left: 20, backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#EFEBE9', maxHeight: 400, zIndex: 1000, elevation: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.15, shadowRadius: 10, overflow: 'hidden',
  },
  notifHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  notifHeaderTitle: { fontSize: 16, fontWeight: 'bold', color: '#5D4037' },
  notifReadAll: { fontSize: 13, color: '#A1887F', fontWeight: '500' },
  notifListScroll: { flexGrow: 0 },
  notifItem: { flexDirection: 'row', padding: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', backgroundColor: '#FFFFFF' },
  notifItemUnread: { backgroundColor: '#FEF6ED' },
  notifIconBox: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 2 },
  notifTextContainer: { flex: 1 },
  notifTitle: { fontSize: 13, fontWeight: '600', color: '#3E2723', lineHeight: 18, marginBottom: 4 },
  notifTime: { fontSize: 11, color: '#8D6E63' },
  notifFooter: { padding: 15, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F5F5F5', backgroundColor: '#FFF' },
  notifFooterText: { fontSize: 13, color: '#A67B5B', fontWeight: '600' },
});

export default DashboardScreen;