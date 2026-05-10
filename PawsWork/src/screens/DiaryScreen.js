import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNav from '../components/BottomNav'; // Đảm bảo đường dẫn import đúng

// ==========================================
// MOCK DATA
// ==========================================
const statsData = [
  { id: '1', value: '8h', label: 'Giờ Làm', bgColor: '#FEF6ED', iconColor: '#D4A373', icon: 'time-outline' },
  { id: '2', value: '24', label: 'Khách', bgColor: '#E8F5E9', iconColor: '#81C784', icon: 'people-outline' },
  { id: '3', value: '4.9', label: 'Rating', bgColor: '#E3F2FD', iconColor: '#64B5F6', icon: 'star-outline' },
  { id: '4', value: '12', label: 'Ảnh', bgColor: '#FCE4EC', iconColor: '#F06292', icon: 'camera-outline' },
];

const filterTabs = ['Tất cả', 'Mochi', 'Kiwi', 'Pudding'];

const mockTimeline = [
  { 
    id: '1', time: '09:00', type: 'KHÁCH HÀNG', desc: 'Mochi được khách chụp ảnh và đánh giá 5 sao', 
    pet: 'Mochi', bgColor: '#F3E5F5', mainColor: '#BA68C8', icon: 'camera' 
  },
  { 
    id: '2', time: '09:30', type: 'ĂN UỐNG', desc: 'Pudding đã ăn sáng đầy đủ', 
    pet: 'Pudding', bgColor: '#FFF3E0', mainColor: '#FFB74D', icon: 'restaurant' 
  },
  { 
    id: '3', time: '10:15', type: 'VUI CHƠI', desc: 'Mochi chơi đùa với khách trong khu vực chơi', 
    pet: 'Mochi', bgColor: '#E8F5E9', mainColor: '#81C784', icon: 'tennisball' 
  },
  { 
    id: '4', time: '11:00', type: 'NGHỈ NGƠI', desc: 'Pudding nghỉ ngơi tại khu vực ngủ', 
    pet: 'Pudding', bgColor: '#E1F5FE', mainColor: '#4FC3F7', icon: 'moon' 
  },
];

const DiaryScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Tất cả');

  // Lọc dữ liệu timeline dựa trên tab đang chọn
  const filteredTimeline = activeTab === 'Tất cả' 
    ? mockTimeline 
    : mockTimeline.filter(item => item.pet === activeTab);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER */}
        <View style={styles.headerBox}>
          <Text style={styles.mainTitle}>Nhật Ký</Text>
          <Text style={styles.subTitle}>Hôm nay — 07/05/2025</Text>
        </View>

        {/* STATS ROW */}
        <View style={styles.statsContainer}>
          {statsData.map(stat => (
            <View key={stat.id} style={[styles.statCard, { backgroundColor: stat.bgColor }]}>
              <Ionicons name={stat.icon} size={20} color={stat.iconColor} style={{ marginBottom: 4 }} />
              <Text style={[styles.statValue, { color: stat.iconColor }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: stat.iconColor }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* FILTER TABS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContainer}>
          {filterTabs.map(tab => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.filterBtn, activeTab === tab && styles.filterBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.filterText, activeTab === tab && styles.filterTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* TIMELINE SECTION */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Timeline Hôm Nay</Text>
          
          <View style={styles.timelineList}>
            {filteredTimeline.length === 0 ? (
              <Text style={styles.emptyText}>Không có hoạt động nào cho bé này hôm nay.</Text>
            ) : (
              filteredTimeline.map((item, index) => (
                <View key={item.id} style={styles.timelineItem}>
                  
                  {/* Cột 1: Thời gian */}
                  <View style={styles.timeCol}>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>

                  {/* Cột 2: Đường nối và Icon */}
                  <View style={styles.dividerCol}>
                    <View style={[styles.iconWrapper, { backgroundColor: item.mainColor }]}>
                      <Ionicons name={item.icon} size={12} color="#FFF" />
                    </View>
                    {/* Chỉ vẽ đường thẳng nối xuống nếu không phải là item cuối cùng */}
                    {index !== filteredTimeline.length - 1 && (
                      <View style={styles.verticalLine} />
                    )}
                  </View>

                  {/* Cột 3: Nội dung */}
                  <View style={[styles.contentCol, { backgroundColor: item.bgColor }]}>
                    <Text style={[styles.typeText, { color: item.mainColor }]}>{item.type}</Text>
                    <Text style={styles.descText}>{item.desc}</Text>
                    <Text style={[styles.petTag, { color: item.mainColor }]}>{item.pet}</Text>
                  </View>
                  
                </View>
              ))
            )}
          </View>
        </View>

      </ScrollView>

      {/* Điều hướng BottomNav */}
      <BottomNav activeTab="Nhật Ký" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  
  headerBox: { marginBottom: 20 },
  mainTitle: { fontSize: 24, fontWeight: 'bold', color: '#5D4037' },
  subTitle: { fontSize: 13, color: '#8D6E63', marginTop: 4 },

  // Stats
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { 
    flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 16, marginHorizontal: 4 
  },
  statValue: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  statLabel: { fontSize: 10, fontWeight: '500' },

  // Filters
  filterScroll: { marginBottom: 20 },
  filterContainer: { flexDirection: 'row', gap: 10, paddingRight: 20 },
  filterBtn: { 
    paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, 
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EFEBE9' 
  },
  filterBtnActive: { backgroundColor: '#8D6E63', borderColor: '#8D6E63' },
  filterText: { fontSize: 13, color: '#8D6E63', fontWeight: '500' },
  filterTextActive: { color: '#FFF', fontWeight: 'bold' },

  // Timeline Card
  timelineCard: { 
    backgroundColor: '#FFF', borderRadius: 24, padding: 20, 
    borderWidth: 1, borderColor: '#EFEBE9',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  timelineTitle: { fontSize: 16, fontWeight: 'bold', color: '#5D4037', marginBottom: 20 },
  emptyText: { color: '#A1887F', textAlign: 'center', fontStyle: 'italic', marginTop: 10 },
  
  // Timeline Items
  timelineList: { paddingBottom: 10 },
  timelineItem: { flexDirection: 'row', marginBottom: 15 },
  
  timeCol: { width: 45, paddingTop: 6 },
  timeText: { fontSize: 12, color: '#5D4037', fontWeight: '600' },
  
  dividerCol: { width: 30, alignItems: 'center' },
  iconWrapper: { 
    width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', zIndex: 2 
  },
  verticalLine: { flex: 1, width: 2, backgroundColor: '#EFEBE9', marginTop: 4, marginBottom: -15, zIndex: 1 },
  
  contentCol: { flex: 1, borderRadius: 16, padding: 12, marginLeft: 5 },
  typeText: { fontSize: 10, fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase' },
  descText: { fontSize: 13, color: '#5D4037', lineHeight: 18, marginBottom: 6 },
  petTag: { fontSize: 11, fontWeight: 'bold' },
});

export default DiaryScreen;