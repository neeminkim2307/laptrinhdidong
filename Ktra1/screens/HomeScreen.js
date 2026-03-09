import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Hello 👋</Text>
          {}
          <Text style={styles.name}>Nguyễn Minh Khiêm</Text> 
        </View>
        <Image source={require('../assets/images/MaskGroup.png')}  style={styles.avatar} /> 
      </View>

      <Text style={styles.title}>Your Insights</Text>
      
      {/* KHUNG CHỨA 4 Ô */}
      <View style={styles.grid}>
        
        {/* Ô 1: Scan New (Nút bấm chuyển trang) */}
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#F9F9F' }]} 
          onPress={() => navigation.navigate('Scan')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#fff' }]}>
            <MaterialCommunityIcons name="qrcode-scan" size={28} color="#D85D90" />
          </View>
          <Text style={styles.cardTitle}>Scan new</Text>
          <Text style={styles.cardSub}>Scanned 483</Text>
        </TouchableOpacity>

        {/* Ô 2: Counterfeits */}
        <View style={[styles.card, { backgroundColor: '#F9F9F9' }]}>
          <View style={[styles.iconBox, { backgroundColor: '#FDECE6' }]}>
            <AntDesign name="warning" size={28} color="#F5A623" />
          </View>
          <Text style={styles.cardTitle}>Counterfeits</Text>
          <Text style={styles.cardSub}>Counterfeited 32</Text>
        </View>

        {/* Ô 3: Success */}
        <View style={[styles.card, { backgroundColor: '#F9F9F9' }]}>
          <View style={[styles.iconBox, { backgroundColor: '#E6F8F2' }]}>
            <Ionicons name="checkmark-circle" size={28} color="#34C759" />
          </View>
          <Text style={styles.cardTitle}>Success</Text>
          <Text style={styles.cardSub}>Checkouts 8</Text>
        </View>

        {/* Ô 4: Directory */}
        <View style={[styles.card, { backgroundColor: '#F9F9F9' }]}>
          <View style={[styles.iconBox, { backgroundColor: '#E8F1FC' }]}>
            <Ionicons name="folder" size={28} color="#5D78FF" />
          </View>
          <Text style={styles.cardTitle}>Directory</Text>
          <Text style={styles.cardSub}>History 26</Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 20 },
  hello: { fontSize: 16, color: '#666', marginBottom: 5 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#1A73E8' },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  
  // Quan trọng: flexWrap: 'wrap' giúp 4 ô tự rớt xuống thành 2 hàng
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  
  card: { 
    width: '47%', // Độ rộng gần một nửa màn hình
    padding: 20, 
    borderRadius: 20, 
    marginBottom: 15, // Khoảng cách giữa hàng trên và hàng dưới
    alignItems: 'center' 
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  cardTitle: { fontWeight: 'bold', fontSize: 15, marginTop: 5 },
  cardSub: { color: '#888', fontSize: 11, marginTop: 5 }
});