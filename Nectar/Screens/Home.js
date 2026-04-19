import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, TextInput, 
  ScrollView, TouchableOpacity, SafeAreaView, FlatList, Alert 
} from 'react-native';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons'; 

// --- DỮ LIỆU MẪU ĐÃ CẬP NHẬT ĐƯỜNG DẪN ẢNH ---
const EXCLUSIVE_OFFERS = [
  { id: '1', name: 'Organic Bananas', price: '$4.99', weight: '7pcs', image: require('../assets/banana.jpg') },
  { id: '2', name: 'Red Apple', price: '$4.99', weight: '1kg', image: require('../assets/RedApple.png') },
];

const BEST_SELLING = [
  { id: '3', name: 'Bell Pepper Red', price: '$4.99', weight: '1kg', image: require('../assets/bellpepper.png') },
  { id: '4', name: 'Ginger', price: '$4.99', weight: '250g', image: require('../assets/ginger.png') },
];

const GROCERIES_CATEGORIES = [
  { id: '1', name: 'Pulses', color: '#FEF1E4', image: require('../assets/FrashFruits.png') }, 
  { id: '2', name: 'Rice', color: '#E5F3EA', image: require('../assets/Dairy.png') },
];

const GROCERIES_PRODUCTS = [
  { id: 'g1', name: 'Beef Bone', weight: '1kg', price: '$4.99', image: require('../assets/MeatFish.png') },
  { id: 'g2', name: 'Broiler Chicken', weight: '1kg', price: '$8.99', image: require('../assets/MeatFish.png') },
];

export default function Home({ navigation }) {
  const [searchText, setSearchText] = useState('');

  // Hàm xử lý tìm kiếm khi ấn Enter
  const handleSearchSubmit = () => {
    if (searchText.toLowerCase().trim() === 'egg') {
      navigation.navigate('Search');
    } else if (searchText.trim() !== '') {
      Alert.alert("Thông báo", "Hãy thử gõ 'egg' để xem kết quả!");
    }
  };

  const ProductCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={item.image} style={styles.productImg} resizeMode="contain" />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productWeight}>{item.weight}, Price</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.productPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 1. Header */}
        <View style={styles.header}>
          <Text style={{fontSize: 30}}>🥕</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={18} color="#4C4B4B" />
            <Text style={styles.locationText}>Dhaka, Banasree</Text>
          </View>
        </View>

        {/* 2. Search Bar - ĐÃ CẬP NHẬT LOGIC ENTER */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#181725" />
          <TextInput 
            placeholder="Search Store" 
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={handleSearchSubmit} // Nhấn Enter để chạy
            returnKeyType="search" // Đổi nút Enter thành chữ Search
            autoCorrect={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={18} color="#7C7C7C" />
            </TouchableOpacity>
          )}
        </View>

        {/* 3. Banner */}
        <View style={styles.bannerContainer}>
          <Image 
            source={require('../assets/banner.jpg')} 
            style={styles.bannerImg} 
            resizeMode="cover"
          />
        </View>

        {/* 4. Exclusive Offer */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Exclusive Offer</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={EXCLUSIVE_OFFERS}
          renderItem={ProductCard}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 25 }}
        />

        {/* 5. Best Selling */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Selling</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={BEST_SELLING}
          renderItem={ProductCard}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 25 }}
        />

        {/* 6. Groceries */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Groceries</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 25, marginBottom: 20 }}>
          {GROCERIES_CATEGORIES.map((cat) => (
            <View key={cat.id} style={[styles.groceryCategoryCard, { backgroundColor: cat.color }]}>
              <Image source={cat.image} style={styles.groceryCategoryIcon} resizeMode="contain" />
              <Text style={styles.groceryCategoryText}>{cat.name}</Text>
            </View>
          ))}
        </ScrollView>

        <FlatList
          horizontal
          data={GROCERIES_PRODUCTS}
          renderItem={ProductCard}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 25, paddingBottom: 120 }}
        />

      </ScrollView>

      {/* 7. Bottom Tab Bar */}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabItem}>
          <Entypo name="shop" size={24} color="#53B175" />
          <Text style={[styles.tabLabel, { color: '#53B175' }]}>Shop</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Explore')}>
          <Feather name="search" size={24} color="#181725" />
          <Text style={styles.tabLabel}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity 
  style={styles.tabItem}
  onPress={() => navigation.navigate('Cart')}
>
  <Ionicons name="cart-outline" size={24} color="#181725" />
  <Text style={styles.tabLabel}>Cart</Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Favorites')}>
          <Ionicons name="heart-outline" size={24} color="#181725" />
          <Text style={styles.tabLabel}>Favourite</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#181725" />
          <Text style={styles.tabLabel}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', marginTop: 10, marginBottom: 20 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  locationText: { fontSize: 18, fontWeight: '600', color: '#4C4B4B', marginLeft: 5 },
  searchContainer: { 
    flexDirection: 'row', backgroundColor: '#F2F3F2', 
    marginHorizontal: 25, borderRadius: 15, paddingHorizontal: 15, 
    height: 50, alignItems: 'center' 
  },
  searchInput: { marginLeft: 10, fontSize: 16, flex: 1, color: '#181725', fontWeight: '600' },
  bannerContainer: { marginHorizontal: 25, marginTop: 20, height: 115, borderRadius: 15, overflow: 'hidden' },
  bannerImg: { width: '100%', height: '100%' },
  sectionHeader: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    alignItems: 'center', paddingHorizontal: 25, marginTop: 25, marginBottom: 15 
  },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  seeAll: { color: '#53B175', fontSize: 16, fontWeight: '600' },
  card: { 
    width: 173, borderWidth: 1, borderColor: '#E2E2E2', 
    borderRadius: 18, padding: 15, marginRight: 15 
  },
  productImg: { width: '100%', height: 100, marginBottom: 15 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  productWeight: { color: '#7C7C7C', fontSize: 14, marginVertical: 5 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  productPrice: { fontSize: 18, fontWeight: 'bold' },
  addBtn: { backgroundColor: '#53B175', padding: 8, borderRadius: 14 },
  groceryCategoryCard: {
    flexDirection: 'row', alignItems: 'center', width: 250, 
    height: 105, borderRadius: 18, paddingHorizontal: 20, marginRight: 15,
  },
  groceryCategoryIcon: { width: 70, height: 70, marginRight: 15 },
  groceryCategoryText: { fontSize: 20, fontWeight: 'bold', color: '#3E423F' },
  bottomTab: { 
    flexDirection: 'row', height: 90, backgroundColor: '#fff', 
    borderTopLeftRadius: 25, borderTopRightRadius: 25,
    elevation: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10,
    paddingHorizontal: 10, justifyContent: 'space-around', alignItems: 'center',
    position: 'absolute', bottom: 0, width: '100%'
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 12, marginTop: 5, fontWeight: '600' }
});