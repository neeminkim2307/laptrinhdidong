import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, 
  TouchableOpacity, Image, Switch 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  // Trạng thái cho nút bật/tắt Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // MỚI THÊM: Rút hàm logout từ trạm phát sóng ra
  const { logout } = useContext(AuthContext);

  // Hàm tạo từng dòng Menu siêu gọn
  const renderMenuItem = (iconName, title, hasSwitch = false) => (
    <TouchableOpacity style={styles.menuItem} disabled={hasSwitch}>
      <View style={styles.menuLeft}>
        <Ionicons name={iconName} size={22} color="#000" style={styles.menuIcon} />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      
      {/* Nếu có Switch thì hiển thị Switch, không thì hiển thị mũi tên */}
      {hasSwitch ? (
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#E5E5EA', true: '#10C177' }} // Màu xanh lá khi bật
          thumbColor="#FFF"
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#CCC" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Nền vàng cong phía sau */}
      <View style={styles.headerBackground} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          {/* Một View rỗng để đẩy Title vào chính giữa */}
          <View style={{ width: 34 }} /> 
        </View>

        {/* ================= AVATAR & THÔNG TIN ================= */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            
            {/* Viền vàng bọc ngoài */}
            <View style={styles.avatarBorder}>
              
              {/* Ảnh Avatar thật đã được bật lên */}
              <Image source={require('../../assets/avatar.jpg')} style={styles.avatarImage} />

            </View>
            
            {/* Nút Edit màu xanh tím đè lên góc dưới */}
            <TouchableOpacity style={styles.editBadge}>
              <Ionicons name="pencil" size={14} color="#FFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>Nguyễn Minh Khiêm</Text>
          <Text style={styles.userEmail}>khiemnguyenminh230@gmail.com</Text>
        </View>

        {/* ================= DANH SÁCH MENU ================= */}
        <View style={styles.menuSection}>
          {renderMenuItem("home-outline", "Home")}
          {renderMenuItem("wallet-outline", "My Card")}
          {renderMenuItem("moon-outline", "Dark Mood", true)}
          {renderMenuItem("location-outline", "Track Your Order")}
          {renderMenuItem("settings-outline", "Settings")}
          {renderMenuItem("help-circle-outline", "Help Center")}
        </View>

        {/* ================= NÚT LOGOUT ================= */}
        {/* MỚI THÊM: Gắn sự kiện onPress={logout} vào đây */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Log Out</Text>
          <Ionicons name="log-out-outline" size={20} color="#FFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { paddingBottom: 40 },
  
  // Nền vàng
  headerBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 200, backgroundColor: '#FEF9E3', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, zIndex: 0 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, zIndex: 1 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  iconBtn: { padding: 5 },
  
  // Khu vực Profile
  profileSection: { alignItems: 'center', marginTop: 20, zIndex: 1 },
  avatarContainer: { position: 'relative', marginBottom: 15 },
  
  // Vòng viền vàng
  avatarBorder: { width: 110, height: 110, borderRadius: 55, borderWidth: 1, borderColor: '#FFD700', justifyContent: 'center', alignItems: 'center', padding: 5 },
  avatarImage: { width: '100%', height: '100%', borderRadius: 50, resizeMode: 'cover' },
  
  // Nút bút chì
  editBadge: { position: 'absolute', bottom: 5, right: 5, backgroundColor: '#5B44E9', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' },
  
  userName: { fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  userEmail: { fontSize: 13, color: '#888' },
  
  // Menu
  menuSection: { marginTop: 30, paddingHorizontal: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { width: 26 },
  menuText: { fontSize: 15, fontWeight: '500', color: '#333', marginLeft: 10 },
  
  // Logout
  logoutBtn: { flexDirection: 'row', backgroundColor: '#5B44E9', marginHorizontal: 20, borderRadius: 30, height: 55, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  logoutText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});