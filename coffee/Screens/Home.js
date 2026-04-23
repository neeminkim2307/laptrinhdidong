import React from 'react';
import { 
  View, Text, StyleSheet, TextInput, Image, 
  FlatList, TouchableOpacity, SafeAreaView, Dimensions, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// DỮ LIỆU DANH SÁCH MÓN ĂN
const COFFEE_DATA = [
  { id: '1', name: 'Caffe Mocha', sub: 'Deep Foam', price: '4.53', rating: '4.8', image: require('../assets/coffee1.png') },
  { id: '2', name: 'Flat White', sub: 'Espresso', price: '3.53', rating: '4.8', image: require('../assets/coffee2.png') },
  { id: '3', name: 'Mocha Latte', sub: 'With Milk', price: '4.12', rating: '4.7', image: require('../assets/coffee4.png') }, // Thêm món từ ảnh 4
  { id: '4', name: 'Cappuccino', sub: 'Creamy Foam', price: '4.80', rating: '4.9', image: require('../assets/coffee5.png') }, // Thêm món từ ảnh 5
];

const HomeScreen = ({ navigation }) => {

  // Component con render từng item
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Detail')}
    >
      <View>
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={10} color="#FFD700" />
          <Text style={styles.ratingText}> {item.rating}</Text>
        </View>
      </View>
      <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.cardSub}>{item.sub}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardPrice}>$ {item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <FlatList
        data={COFFEE_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listPadding}
        
        // --- PHẦN HEADER ĐƯA VÀO LISTHEADERCOMPONENT ĐỂ CUỘN CÙNG DANH SÁCH ---
        ListHeaderComponent={
          <View>
            {/* HEADER DARK SECTION */}
            <View style={styles.headerBackground}>
              <View style={styles.headerContent}>
                <View>
                  <Text style={styles.locationLabel}>Location</Text>
                  <Text style={styles.locationValue}>Bilzen, Tanjungbalai ⌵</Text>
                </View>
                <Image source={{ uri: 'https://i.pravatar.cc/150' }} style={styles.avatar} />
              </View>

              <View style={styles.searchRow}>
                <View style={styles.searchContainer}>
                  <Ionicons name="search" size={20} color="#989898" style={{ marginRight: 10 }} />
                  <TextInput placeholder="Search coffee" placeholderTextColor="#989898" style={styles.searchInput}/>
                </View>
                <TouchableOpacity style={styles.filterButton}>
                  <Ionicons name="options-outline" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            {/* PROMO BANNER */}
            <View style={styles.promoContainer}>
              <Image source={require('../assets/coffee3.png')} style={styles.promoImage} />
              <View style={styles.promoOverlay}>
                <View style={styles.promoTag}><Text style={styles.promoTagText}>Promo</Text></View>
                <Text style={styles.promoTitle}>Buy one get{"\n"}one FREE</Text>
              </View>
            </View>

            {/* CATEGORIES */}
            <View style={{ marginBottom: 20 }}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={['All Coffee', 'Machiato', 'Latte', 'Americano']}
                keyExtractor={(item) => item}
                contentContainerStyle={{ paddingLeft: 30 }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity style={[styles.categoryItem, index === 0 && styles.categoryItemActive]}>
                    <Text style={[styles.categoryText, index === 0 && styles.categoryTextActive]}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        }
      />

      {/* BOTTOM TAB (LUÔN CỐ ĐỊNH) */}
      <View style={styles.bottomTab}>
         <Ionicons name="home" size={24} color="#C67C4E" />
         <Ionicons name="heart-outline" size={24} color="#8D8D8D" />
         <Ionicons name="bag-outline" size={24} color="#8D8D8D" />
         <Ionicons name="notifications-outline" size={24} color="#8D8D8D" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  headerBackground: {
    backgroundColor: '#131313',
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 100, // Tạo khoảng trống cho banner đè lên
  },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationLabel: { color: '#B7B7B7', fontSize: 12 },
  locationValue: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  avatar: { width: 44, height: 44, borderRadius: 12 },
  searchRow: { flexDirection: 'row', marginTop: 25, justifyContent: 'space-between' },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#313131',
    borderRadius: 16,
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 52,
  },
  searchInput: { color: '#fff', flex: 1 },
  filterButton: {
    backgroundColor: '#C67C4E',
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  promoContainer: {
    marginTop: -70,
    marginHorizontal: 30,
    borderRadius: 16,
    overflow: 'hidden',
    height: 140,
    marginBottom: 25,
  },
  promoImage: { width: '100%', height: '100%' },
  promoOverlay: { position: 'absolute', padding: 15 },
  promoTag: { backgroundColor: '#ED5151', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  promoTagText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  promoTitle: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginTop: 8 },
  
  categoryItem: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, marginRight: 10, height: 40 },
  categoryItemActive: { backgroundColor: '#C67C4E' },
  categoryText: { color: '#2F2D2C', fontWeight: '500' },
  categoryTextActive: { color: '#fff' },

  // Grid Styles
  listPadding: { paddingBottom: 100 },
  row: { justifyContent: 'space-between', paddingHorizontal: 30 },
  card: {
    backgroundColor: '#fff',
    width: (width - 80) / 2,
    borderRadius: 16,
    padding: 8,
    marginBottom: 20,
  },
  cardImage: { width: '100%', height: 130, borderRadius: 12 },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  ratingText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  cardName: { fontSize: 16, fontWeight: 'bold', marginTop: 10, color: '#2F2D2C' },
  cardSub: { fontSize: 12, color: '#9B9B9B', marginBottom: 10 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 18, fontWeight: 'bold', color: '#2F4B4E' },
  addButton: { backgroundColor: '#C67C4E', padding: 8, borderRadius: 10 },

  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  }
});

export default HomeScreen;