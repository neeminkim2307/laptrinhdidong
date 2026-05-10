// BottomNav.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomNav = ({ activeTab, navigation }) => {
  // Hàm hỗ trợ render từng nút để code không bị lặp lại
  const renderNavItem = (tabName, iconName, label) => {
    const isActive = activeTab === tabName;
    const color = isActive ? '#D4A373' : '#A1887F'; // Nâu thương hiệu (active) và nâu nhạt (inactive)
    
    // Nếu active thì dùng icon đặc (bỏ '-outline'), nếu không thì dùng outline
    const finalIconName = isActive ? iconName.replace('-outline', '') : iconName;

    return (
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate(tabName)}
      >
        <Ionicons name={finalIconName} size={24} color={color} />
        <Text style={[styles.navText, { color: color }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.bottomNav}>
      {renderNavItem('Dashboard', 'home-outline', 'Trang chủ')}
      {renderNavItem('Pets', 'heart-outline', 'Thú Cưng')}
      {renderNavItem('Calendar', 'calendar-outline', 'Đặt Lịch')}
      {renderNavItem('Wallet', 'wallet-outline', 'Ví Tiền')}
      {renderNavItem('Diary', 'pulse-outline', 'Nhật Ký')}
      {renderNavItem('More', 'ellipsis-horizontal-outline', 'Khác')}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    paddingVertical: 12, 
    paddingHorizontal: 5, // Căn lề nhỏ lại để nhường chỗ cho 6 icon
    paddingBottom: 25, // Chừa không gian cho thanh home bar của iPhone
    borderTopWidth: 1, 
    borderTopColor: '#F5F5F5',
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: -3 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 5, 
    elevation: 10
  },
  navItem: { 
    alignItems: 'center',
    flex: 1, // Để 6 icon tự chia đều khoảng cách
  },
  navText: { 
    fontSize: 10, // Chữ nhỏ lại một chút để không bị tràn dòng
    marginTop: 4, 
    fontWeight: '500' 
  }
});

export default BottomNav;