import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNav from '../components/BottomNav'; // Import component thanh điều hướng dùng chung

const pets = ['Mochi', 'Kiwi', 'Pudding'];

const baseShifts = [
  { id: '1', title: 'Ca 1', time: '9:00 - 13:00', startHour: 9, booked: true },
  { id: '2', title: 'Ca 2', time: '13:00 - 17:00', startHour: 13, booked: false },
  { id: '3', title: 'Ca 3', time: '17:00 - 21:00', startHour: 17, booked: false },
];

const BookingFormScreen = ({ navigation }) => {
  const [selectedPet, setSelectedPet] = useState('Pudding');
  const [selectedShift, setSelectedShift] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 20);

  // Mảng giả lập các ngày đã có lịch (Ví dụ: Ngày mai và 4 ngày sau)
  const mockBookedDates = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).getTime(),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4).getTime(),
  ];

  const [selectedDate, setSelectedDate] = useState(today);
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const generateCalendarGrid = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    let grid = [];
    let row = [];

    for (let i = 0; i < firstDayIndex; i++) row.push(null);

    for (let d = 1; d <= daysInMonth; d++) {
      row.push(new Date(year, month, d));
      if (row.length === 7) {
        grid.push(row);
        row = [];
      }
    }
    if (row.length > 0) {
      while (row.length < 7) row.push(null);
      grid.push(row);
    }
    return grid;
  };

  const calendarGrid = generateCalendarGrid();
  const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  const handlePrevMonth = () => {
    if (viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() === today.getMonth()) return;
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    if (viewDate.getFullYear() === maxDate.getFullYear() && viewDate.getMonth() === maxDate.getMonth()) return;
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const formatDateString = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const currentHour = new Date().getHours();
  const isTodaySelected = selectedDate.getTime() === today.getTime();

  useEffect(() => {
    setSelectedShift(null);
  }, [selectedDate]);

  const processedShifts = baseShifts.map(shift => {
    let isTimePassed = false;
    if (isTodaySelected && currentHour >= shift.startHour) {
      isTimePassed = true;
    }
    return {
      ...shift,
      disabled: shift.booked || isTimePassed,
      reason: shift.booked ? 'Đã đặt' : (isTimePassed ? 'Quá giờ' : '')
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.calendarCard}>
          <View style={styles.calHeaderRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={24} color="#5D4037" />
            </TouchableOpacity>
            
            <View style={styles.monthControls}>
              <TouchableOpacity onPress={handlePrevMonth} style={styles.monthBtn}>
                <Ionicons name="caret-back" size={16} color="#A1887F" />
              </TouchableOpacity>
              <Text style={styles.calMonthText}>Tháng {monthNames[viewDate.getMonth()]}, {viewDate.getFullYear()}</Text>
              <TouchableOpacity onPress={handleNextMonth} style={styles.monthBtn}>
                <Ionicons name="caret-forward" size={16} color="#A1887F" />
              </TouchableOpacity>
            </View>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.calDaysRow}>
            {daysOfWeek.map((day, index) => (
              <Text key={index} style={styles.calDayText}>{day}</Text>
            ))}
          </View>

          {calendarGrid.map((week, wIndex) => (
            <View key={wIndex} style={styles.calWeekRow}>
              {week.map((dateObj, dIndex) => {
                if (!dateObj) return <View key={dIndex} style={styles.calDateCell} />;

                const dateTimestamp = dateObj.getTime();
                const isSelected = dateTimestamp === selectedDate.getTime();
                const isToday = dateTimestamp === today.getTime();
                const isHasBooking = mockBookedDates.includes(dateTimestamp);
                
                const isPast = dateObj < today;
                const isTooFar = dateObj > maxDate;
                const isDisabled = isPast || isTooFar;

                return (
                  <View key={dIndex} style={styles.calDateCell}>
                    <TouchableOpacity 
                      disabled={isDisabled}
                      onPress={() => setSelectedDate(dateObj)}
                      style={[
                        styles.dateCircle, 
                        isSelected && styles.dateCircleSelected,
                        isDisabled && styles.dateCircleDisabled
                      ]}
                    >
                      <Text style={[
                        styles.dateText, 
                        isSelected && styles.dateTextSelected,
                        isDisabled && styles.dateTextDisabled
                      ]}>
                        {dateObj.getDate()}
                      </Text>
                    </TouchableOpacity>
                    
                    {/* KHU VỰC HIỂN THỊ CHẤM TRÒN (DOTS) */}
                    <View style={styles.dotsContainer}>
                      {isToday ? <View style={[styles.dot, { backgroundColor: '#EAA871' }]} /> : null}
                      {isHasBooking ? <View style={[styles.dot, { backgroundColor: '#4CAF50' }]} /> : null}
                    </View>
                  </View>
                );
              })}
            </View>
          ))}

          {/* CHÚ THÍCH (LEGEND) */}
          <View style={styles.calLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: '#EAA871'}]} />
              <Text style={styles.legendText}>Hôm nay</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: '#4CAF50'}]} />
              <Text style={styles.legendText}>Có lịch</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: '#8D6E63'}]} />
              <Text style={styles.legendText}>Đang chọn</Text>
            </View>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Chọn Ca — {formatDateString(selectedDate)}</Text>
          
          <Text style={styles.sectionLabel}>Thú cưng</Text>
          <View style={styles.petsRow}>
            {pets.map((pet, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.petBtn, selectedPet === pet && styles.petBtnActive]}
                onPress={() => setSelectedPet(pet)}
              >
                <Text style={[styles.petBtnText, selectedPet === pet && styles.petBtnTextActive]}>{pet}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionLabel}>Ca làm việc (Giới hạn: 20 ngày)</Text>
          <View style={styles.shiftsRow}>
            {processedShifts.map((shift) => (
              <TouchableOpacity 
                key={shift.id} 
                disabled={shift.disabled}
                style={[
                  styles.shiftBox, 
                  shift.disabled && styles.shiftBoxDisabled,
                  selectedShift === shift.id && styles.shiftBoxSelected
                ]}
                onPress={() => setSelectedShift(shift.id)}
              >
                <Text style={[styles.shiftTitle, shift.disabled && styles.shiftTextDisabled]}>{shift.title}</Text>
                <Text style={[styles.shiftTime, shift.disabled && styles.shiftTextDisabled]}>{shift.time}</Text>
                {shift.disabled ? <Text style={styles.shiftBookedText}>{shift.reason}</Text> : null}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.incomeBox}>
            <Text style={styles.incomeText}>$ Thu nhập dự kiến: đ60,000 / ca</Text>
          </View>

          <TouchableOpacity 
            style={[styles.submitBtn, !selectedShift && styles.submitBtnDisabled]}
            disabled={!selectedShift}
            onPress={() => {
              Alert.alert("Thành công", `Đã đặt ${selectedPet} - Ca ${selectedShift} ngày ${formatDateString(selectedDate)}`);
              navigation.goBack();
            }}
          >
            <Text style={[styles.submitBtnText, !selectedShift && styles.submitBtnTextDisabled]}>
              Xác Nhận Đặt Lịch
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <BottomNav activeTab="Calendar" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  
  calendarCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 15, marginBottom: 20, borderWidth: 1, borderColor: '#EFEBE9' },
  calHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  backBtn: { padding: 5 },
  monthControls: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  monthBtn: { padding: 5 },
  calMonthText: { fontSize: 16, fontWeight: 'bold', color: '#5D4037', minWidth: 110, textAlign: 'center' },
  
  calDaysRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  calDayText: { fontSize: 12, color: '#A1887F', width: 30, textAlign: 'center' },
  calWeekRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  calDateCell: { width: 35, height: 45, alignItems: 'center' }, // Tăng height một chút để chứa các dấu chấm
  dateCircle: { width: 32, height: 32, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  dateCircleSelected: { backgroundColor: '#8D6E63' },
  dateCircleDisabled: { backgroundColor: 'transparent' },
  dateText: { fontSize: 14, color: '#5D4037', fontWeight: '500' },
  dateTextSelected: { color: '#FFF', fontWeight: 'bold' },
  dateTextDisabled: { color: '#D7CCC8', textDecorationLine: 'line-through' },
  
  // Style cho các chấm tròn
  dotsContainer: { flexDirection: 'row', gap: 3, marginTop: 3, height: 4 },
  dot: { width: 4, height: 4, borderRadius: 2 },
  
  calLegend: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginTop: 10, gap: 15 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, color: '#8D6E63' },

  formCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#EFEBE9' },
  formTitle: { fontSize: 16, fontWeight: 'bold', color: '#5D4037', marginBottom: 15 },
  sectionLabel: { fontSize: 13, color: '#8D6E63', marginBottom: 10 },
  
  petsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  petBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#FFF8F0', borderWidth: 1, borderColor: '#EFEBE9' },
  petBtnActive: { backgroundColor: '#8D6E63', borderColor: '#8D6E63' },
  petBtnText: { fontSize: 13, color: '#8D6E63', fontWeight: '500' },
  petBtnTextActive: { color: '#FFF' },

  shiftsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  shiftBox: { flex: 1, backgroundColor: '#FFF8F0', borderRadius: 12, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#EFEBE9' },
  shiftBoxDisabled: { backgroundColor: '#F5F5F5', borderColor: '#F5F5F5' },
  shiftBoxSelected: { borderColor: '#8D6E63', backgroundColor: '#FEF6ED' },
  shiftTitle: { fontSize: 13, fontWeight: 'bold', color: '#5D4037', marginBottom: 4 },
  shiftTime: { fontSize: 10, color: '#8D6E63', textAlign: 'center' },
  shiftTextDisabled: { color: '#BDBDBD' },
  shiftBookedText: { fontSize: 10, color: '#F44336', marginTop: 4, fontWeight: 'bold' },

  incomeBox: { backgroundColor: '#E8F5E9', padding: 12, borderRadius: 8, marginBottom: 20, alignItems: 'center' },
  incomeText: { color: '#2E7D32', fontWeight: 'bold', fontSize: 13 },

  submitBtn: { backgroundColor: '#8D6E63', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  submitBtnDisabled: { backgroundColor: '#EFEBE9' },
  submitBtnText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  submitBtnTextDisabled: { color: '#A1887F' },
});

export default BookingFormScreen;