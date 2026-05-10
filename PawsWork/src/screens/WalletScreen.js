import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNav from '../components/BottomNav'; // Import component thanh điều hướng dùng chung

// ==========================================
// MOCK DATA
// ==========================================
const walletData = {
  totalBalance: '840.000',
  monthlyIncome: '360.000',
  monthlySpending: '80.000',
  weeklyChart: [
    { day: 'T2', income: 40, spending: 20 },
    { day: 'T3', income: 70, spending: 30 },
    { day: 'T4', income: 30, spending: 10 },
    { day: 'T5', income: 50, spending: 40 },
    { day: 'T6', income: 85, spending: 25 },
    { day: 'T7', income: 20, spending: 60 },
    { day: 'CN', income: 45, spending: 15 },
  ]
};

// Cập nhật lại mock data chỉ cần phân biệt type: 'income' hoặc 'spending'
const mockTransactions = [
  { id: '1', title: 'Lương ca làm - Mochi', date: '07/05/2025', amount: '+đ60K', type: 'income' },
  { id: '2', title: 'Lương ca làm - Pudding', date: '06/05/2025', amount: '+đ60K', type: 'income' },
  { id: '3', title: 'Phí dịch vụ tháng 5', date: '05/05/2025', amount: '-đ50K', type: 'spending' },
  { id: '4', title: 'Lương ca làm - Mochi', date: '04/05/2025', amount: '+đ60K', type: 'income' },
  { id: '5', title: 'Bonus xuất sắc - Mochi', date: '03/05/2025', amount: '+đ60K', type: 'income' },
  { id: '6', title: 'Phí thú y - Kiwi', date: '02/05/2025', amount: '-đ30K', type: 'spending' },
  { id: '7', title: 'Lương ca làm - Kiwi', date: '01/05/2025', amount: '+đ60K', type: 'income' },
  { id: '8', title: 'Lương ca làm - Pudding', date: '28/04/2025', amount: '+đ60K', type: 'income' },
];

const WalletScreen = ({ navigation }) => {
  const [viewMode, setViewMode] = useState('overview'); 
  const [filter, setFilter] = useState('Tất cả');

  // ==========================================
  // COMPONENT RENDER TỪNG DÒNG GIAO DỊCH CHUẨN THIẾT KẾ
  // ==========================================
  const renderTransactionItem = (item) => {
    const isIncome = item.type === 'income';
    return (
      <View key={item.id} style={styles.transItem}>
        {/* Khối Icon mũi tên chéo */}
        <View style={[styles.transIconBox, { backgroundColor: isIncome ? '#E8F5E9' : '#FFEBEE' }]}>
          <Ionicons 
            name={isIncome ? "arrow-down-outline" : "arrow-up-outline"} 
            size={18} 
            color={isIncome ? '#4CAF50' : '#E53935'} 
            style={{ transform: [{ rotate: '45deg' }] }} // Xoay 45 độ để tạo mũi tên chéo
          />
        </View>
        
        {/* Thông tin */}
        <View style={styles.transInfo}>
          <Text style={styles.transTitle}>{item.title}</Text>
          <Text style={styles.transDate}>{item.date}</Text>
        </View>
        
        {/* Số tiền */}
        <Text style={[styles.transAmount, { color: isIncome ? '#4CAF50' : '#E53935' }]}>
          {item.amount}
        </Text>
      </View>
    );
  };

  // ==========================================
  // MÀN HÌNH 2: LỊCH SỬ CHI TIẾT (Khớp 100% ảnh mới)
  // ==========================================
  if (viewMode === 'history') {
    const filteredTrans = mockTransactions.filter(t => {
      if (filter === 'Thu nhập') return t.type === 'income';
      if (filter === 'Chi tiêu') return t.type === 'spending';
      return true;
    });

    return (
      <SafeAreaView style={styles.container}>
        {/* Nút Back nằm ngoài Card */}
        <View style={styles.headerDetail}>
          <TouchableOpacity onPress={() => setViewMode('overview')} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#5D4037" />
          </TouchableOpacity>
        </View>

        {/* Khung Card trắng bọc toàn bộ Lịch sử */}
        <View style={styles.historyFullCard}>
          <Text style={styles.historyFullTitle}>Lịch Sử Giao Dịch</Text>
          
          <View style={styles.filterRowInside}>
            {['Tất cả', 'Thu nhập', 'Chi tiêu'].map((tab) => (
              <TouchableOpacity 
                key={tab} 
                style={[styles.filterTab, filter === tab && styles.filterTabActive]}
                onPress={() => setFilter(tab)}
              >
                <Text style={[styles.filterTabText, filter === tab && styles.filterTabTextActive]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            {filteredTrans.map(renderTransactionItem)}
          </ScrollView>
        </View>

        <BottomNav activeTab="Wallet" navigation={navigation} />
      </SafeAreaView>
    );
  }

  // ==========================================
  // MÀN HÌNH 1: TỔNG QUAN VÍ
  // ==========================================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.mainTitle}>Ví Tiền</Text>
        <Text style={styles.subTitle}>Theo dõi thu nhập và giao dịch</Text>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>TỔNG SỐ DƯ</Text>
          <Text style={styles.balanceAmount}>đ {walletData.totalBalance}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Thu nhập tháng này</Text>
              <Text style={[styles.statValue, {color: '#4CAF50'}]}>đ {walletData.monthlyIncome}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Chi tiêu tháng này</Text>
              <Text style={[styles.statValue, {color: '#FF5252'}]}>đ {walletData.monthlySpending}</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="arrow-up-circle" size={20} color="#FFF" />
              <Text style={styles.actionBtnText}>Nạp Tiền</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#8D6E63'}]}>
              <Ionicons name="arrow-down-circle" size={20} color="#FFF" />
              <Text style={styles.actionBtnText}>Rút Tiền</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Thu - Chi Tuần này</Text>
          <View style={styles.chartContainer}>
            {walletData.weeklyChart.map((item, index) => (
              <View key={index} style={styles.chartColumn}>
                <View style={styles.barStack}>
                  <View style={[styles.bar, { height: item.income, backgroundColor: '#C8E6C9' }]} />
                  <View style={[styles.bar, { height: item.spending, backgroundColor: '#FFCCBC' }]} />
                </View>
                <Text style={styles.chartDayText}>{item.day}</Text>
              </View>
            ))}
          </View>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}><View style={[styles.legendDot, {backgroundColor: '#C8E6C9'}]} /><Text style={styles.legendText}>Thu nhập</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendDot, {backgroundColor: '#FFCCBC'}]} /><Text style={styles.legendText}>Chi tiêu</Text></View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lịch Sử Giao Dịch</Text>
          <TouchableOpacity onPress={() => setViewMode('history')}>
            <Text style={styles.seeAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.miniHistoryCard}>
          {mockTransactions.slice(0, 4).map(renderTransactionItem)}
        </View>

      </ScrollView>
      <BottomNav activeTab="Wallet" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  mainTitle: { fontSize: 24, fontWeight: 'bold', color: '#5D4037' },
  subTitle: { fontSize: 13, color: '#8D6E63', marginBottom: 20 },

  // Balance Card
  balanceCard: { backgroundColor: '#7A5C4D', borderRadius: 24, padding: 25, marginBottom: 25, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
  balanceLabel: { color: '#D7CCC8', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  balanceAmount: { color: '#FFF', fontSize: 32, fontWeight: 'bold', marginVertical: 10 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  statBox: { flex: 1 },
  statLabel: { color: '#D7CCC8', fontSize: 10, marginBottom: 4 },
  statValue: { fontSize: 14, fontWeight: 'bold' },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: 15 },
  actionRow: { flexDirection: 'row', gap: 12 },
  actionBtn: { flex: 1, flexDirection: 'row', backgroundColor: '#D4A373', paddingVertical: 12, borderRadius: 15, justifyContent: 'center', alignItems: 'center', gap: 8 },
  actionBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },

  // Chart Section
  sectionCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 25, borderWidth: 1, borderColor: '#EFEBE9' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#5D4037', marginBottom: 15 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 120, marginBottom: 15 },
  chartColumn: { alignItems: 'center' },
  barStack: { width: 12, justifyContent: 'flex-end', gap: 2 },
  bar: { width: 12, borderRadius: 4 },
  chartDayText: { fontSize: 11, color: '#A1887F', marginTop: 8 },
  chartLegend: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11, color: '#8D6E63' },

  // Mini History
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  seeAllText: { color: '#D4A373', fontWeight: 'bold', fontSize: 13 },
  miniHistoryCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 10, borderWidth: 1, borderColor: '#EFEBE9' },
  
  // Transaction Item (Dùng chung cho cả 2 màn hình)
  transItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  transIconBox: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  transInfo: { flex: 1 },
  transTitle: { fontSize: 14, fontWeight: 'bold', color: '#4E342E', marginBottom: 4 },
  transDate: { fontSize: 11, color: '#A1887F' },
  transAmount: { fontSize: 15, fontWeight: 'bold' },

  // ==========================
  // DETAIL MODE STYLES (Màn hình 2)
  // ==========================
  headerDetail: { padding: 20, paddingBottom: 10 },
  backBtn: { width: 40 },
  
  historyFullCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 24,
    marginHorizontal: 20,
    marginBottom: 80, // Để không bị đè bởi BottomNav
    padding: 20,
    borderWidth: 1,
    borderColor: '#EFEBE9',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  historyFullTitle: { fontSize: 18, fontWeight: 'bold', color: '#5D4037', marginBottom: 20 },
  
  filterRowInside: { flexDirection: 'row', marginBottom: 20, gap: 10 },
  filterTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#FFF8F0' }, // Màu nền kem khi chưa chọn
  filterTabActive: { backgroundColor: '#8D6E63' }, // Màu nâu khi được chọn
  filterTabText: { fontSize: 13, color: '#8D6E63', fontWeight: '600' },
  filterTabTextActive: { color: '#FFF' }
});

export default WalletScreen;