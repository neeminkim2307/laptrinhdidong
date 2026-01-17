import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DATA = [
  {
    id: '1',
    title: 'Bước 1: Xác định nhu cầu khách hàng',
    content: 'Vũ Văn Hoàng sắp đến hạn lúc 01/08/2020 9:00',
    time: '20/08/2020, 06:00',
    icon: 'checkmark-circle'
  },
  {
    id: '2',
    title: 'Bạn có khách hàng mới!',
    content: 'Chúc mừng bạn, bạn có khách hàng mới. Hãy mau chóng liên lạc.',
    time: '20/08/2020, 06:00',
    icon: 'people'
  },
  {
    id: '3',
    title: 'Khách hàng được chia sẻ bị trùng',
    content: 'Rất tiếc, khách hàng được chia sẻ đã tồn tại trên hệ thống. Vui lòng chia sẻ khách hàng.',
    time: '20/08/2020, 06:00',
    icon: 'people'
  },
  {
    id: '4',
    title: 'Khách hàng được thêm bị trùng',
    content: 'Rất tiếc khách hàng được thêm đã tồn tại trên hệ thống. Vui lòng thêm khách hàng.',
    time: '20/08/2020, 06:00',
    icon: 'people'
  },
  {
    id: '5',
    title: 'Công việc sắp đến hạn trong hôm nay',
    content: 'Bạn có 17 công việc sắp đến hạn trong hôm nay.',
    time: '20/08/2020, 06:00',
    icon: 'checkmark-circle'
  },
  {
    id: '6',
    title: 'Công việc đã quá hạn',
    content: 'Bạn có 17 công việc bị quá hạn. Hãy kiểm tra và lên kế hoạch cho công việc.',
    time: '20/08/2020, 06:00',
    icon: 'checkmark-circle'
  },
];

export default function App() {
  const renderItem = ({ item }) => {
  const isBlue = item.id === '1' || item.id === '2' || item.id === '4';

  return (
    <View style={[styles.item, isBlue && styles.blueItem]}>
      <Ionicons
        name={item.icon}
        size={26}
        color="#2f5bea"   // GIỮ NGUYÊN MÀU ICON CHO TẤT CẢ
        style={styles.icon}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );
};



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông báo</Text>

      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center'
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  icon: {
    marginRight: 12,
    marginTop: 4
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontSize: 15,
    fontWeight: '600'
  },
  content: {
    fontSize: 13,
    color: '#555',
    marginVertical: 4
  },
  time: {
    fontSize: 11,
    color: '#999999'
  },
  blueItem: {
  backgroundColor: '#eaf2ff'
  },
});
