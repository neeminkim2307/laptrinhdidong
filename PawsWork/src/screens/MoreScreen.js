import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  // Quản lý trạng thái bật/tắt của các cài đặt thông báo
  const [notifySchedule, setNotifySchedule] = useState(true);
  const [notifyPayment, setNotifyPayment] = useState(true);
  const [notifyRating, setNotifyRating] = useState(false);

  // Helper component để vẽ từng dòng menu (tránh lặp code)
  const MenuItem = ({ icon, title, subtitle, rightElement, onPress, isLast }) => (
    <TouchableOpacity 
      style={[styles.menuItem, !isLast && styles.menuItemBorder]} 
      onPress={onPress}
      disabled={!onPress} // Vô hiệu hóa ấn nếu không truyền hàm onPress (ví dụ các hàng chỉ có Switch)
    >
      <View style={styles.menuIconBox}>
        <Ionicons name={icon} size={22} color="#D4A373" />
      </View>
      <View style={styles.menuTextInfo}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle ? <Text style={styles.menuSubtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.menuRight}>
        {rightElement || <Ionicons name="chevron-forward" size={20} color="#A1887F" />}
      </View>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", style: "destructive", onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] }) }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header đơn giản có nút Back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#5D4037" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tài Khoản & Cài Đặt</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* THÔNG TIN NGƯỜI DÙNG */}
        <View style={styles.profileCard}>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarText}>LN</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Linh Nguyễn</Text>
            <Text style={styles.userEmail}>owner@pawswork.vn</Text>
          </View>
        </View>

        {/* NHÓM 1: TÀI KHOẢN */}
        <Text style={styles.sectionTitle}>TÀI KHOẢN</Text>
        <View style={styles.sectionCard}>
          <MenuItem 
            icon="person-outline" 
            title="Thông tin cá nhân" 
            subtitle="Cập nhật hồ sơ của bạn" 
            onPress={() => navigation.navigate('PersonalInfo')} 
          />
          <MenuItem 
            icon="lock-closed-outline" 
            title="Đổi mật khẩu" 
            isLast={true} 
            onPress={() => navigation.navigate('Security')} 
          />
        </View>

        {/* NHÓM 2: THÔNG BÁO */}
        <Text style={styles.sectionTitle}>THÔNG BÁO</Text>
        <View style={styles.sectionCard}>
          <MenuItem 
            icon="calendar-outline" 
            title="Lịch làm việc" 
            subtitle="Nhắc nhở lịch đặt và thay đổi" 
            rightElement={
              <Switch 
                value={notifySchedule} 
                onValueChange={setNotifySchedule}
                trackColor={{ false: '#EFEBE9', true: '#009688' }}
                thumbColor={'#FFF'}
              />
            }
          />
          <MenuItem 
            icon="card-outline" 
            title="Thanh toán" 
            subtitle="Thông báo giao dịch ví" 
            rightElement={
              <Switch 
                value={notifyPayment} 
                onValueChange={setNotifyPayment}
                trackColor={{ false: '#EFEBE9', true: '#009688' }}
                thumbColor={'#FFF'}
              />
            }
          />
          <MenuItem 
            icon="star-outline" 
            title="Đánh giá" 
            subtitle="Nhận đánh giá từ khách hàng" 
            isLast={true}
            rightElement={
              <Switch 
                value={notifyRating} 
                onValueChange={setNotifyRating}
                trackColor={{ false: '#EFEBE9', true: '#009688' }}
                thumbColor={'#FFF'}
              />
            }
          />
        </View>

        {/* NHÓM 3: HỖ TRỢ */}
        <Text style={styles.sectionTitle}>HỖ TRỢ</Text>
        <View style={styles.sectionCard}>
          <MenuItem 
            icon="help-circle-outline" 
            title="Trung tâm hỗ trợ" 
            subtitle="Câu hỏi thường gặp và liên hệ" 
            onPress={() => {}} 
          />
          <MenuItem 
            icon="shield-checkmark-outline" 
            title="Chính sách & Điều khoản" 
            onPress={() => {}} 
          />
          <MenuItem 
            icon="information-circle-outline" 
            title="Về PawsWork" 
            subtitle="Phiên bản 1.0.0" 
            isLast={true} 
            onPress={() => {}} 
          />
        </View>

        {/* NÚT ĐĂNG XUẤT */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#F44336" />
          <Text style={styles.logoutBtnText}>Đăng Xuất</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 
  },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#5D4037' },
  
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

  // Profile Card
  profileCard: { 
    flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 20, padding: 20, 
    alignItems: 'center', marginBottom: 30, borderWidth: 1, borderColor: '#EFEBE9',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  avatarBox: { 
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#8D6E63', 
    justifyContent: 'center', alignItems: 'center', marginRight: 15 
  },
  avatarText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  userInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#5D4037', marginBottom: 4 },
  userEmail: { fontSize: 13, color: '#A1887F', marginBottom: 8 },
  roleBadge: { backgroundColor: '#FEF6ED', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  roleText: { color: '#D4A373', fontSize: 11, fontWeight: 'bold' },
  editBtn: { padding: 10 },

  // Sections
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#A1887F', letterSpacing: 1, marginBottom: 10, marginLeft: 10 },
  sectionCard: { 
    backgroundColor: '#FFF', borderRadius: 20, marginBottom: 25, borderWidth: 1, borderColor: '#EFEBE9', overflow: 'hidden'
  },
  
  // Menu Item
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  menuIconBox: { width: 40, alignItems: 'flex-start' },
  menuTextInfo: { flex: 1, justifyContent: 'center' },
  menuTitle: { fontSize: 15, color: '#4E342E', fontWeight: '500' },
  menuSubtitle: { fontSize: 12, color: '#A1887F', marginTop: 3 },
  menuRight: { justifyContent: 'center', alignItems: 'flex-end' },

  // Logout Button
  logoutBtn: { 
    flexDirection: 'row', backgroundColor: '#FFEBEE', paddingVertical: 16, 
    borderRadius: 16, justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 10 
  },
  logoutBtnText: { color: '#F44336', fontSize: 16, fontWeight: 'bold' }
});

export default ProfileScreen;