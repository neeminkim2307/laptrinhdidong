import React from 'react';
import { 
  View, Text, StyleSheet, FlatList, TextInput, 
  Image, TouchableOpacity, SafeAreaView 
} from 'react-native';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';

// --- DỮ LIỆU DANH MỤC ĐÃ CẬP NHẬT ẢNH ---
const CATEGORIES = [
  { id: '1', title: 'Frash Fruits\n& Vegetable', color: '#EEF8F2', border: '#53B175', image: require('../assets/FrashFruits.png') },
  { id: '2', title: 'Cooking Oil\n& Ghee', color: '#FFF6EE', border: '#F8A44C', image: require('../assets/CookingOil.png') },
  { id: '3', title: 'Meat & Fish', color: '#FDE8E4', border: '#F7A593', image: require('../assets/MeatFish.png') },
  { id: '4', title: 'Bakery & Snacks', color: '#F4EBF7', border: '#D3B0E0', image: require('../assets/Bakery.png') },
  { id: '5', title: 'Dairy & Eggs', color: '#FFF9E5', border: '#FDE598', image: require('../assets/Dairy.png') },
  { id: '6', title: 'Beverages', color: '#EDF7FC', border: '#B7DFF5', image: require('../assets/Beverages.png') },
];

export default function Explore({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.categoryCard, { backgroundColor: item.color, borderColor: item.border }]}
      onPress={() => {
        if (item.title === 'Beverages') {
          navigation.navigate('Beverages');
        }
      }}
    >
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Find Products</Text>
      
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#181725" />
        <TextInput placeholder="Search Store" style={styles.searchInput} />
      </View>

      <FlatList
        data={CATEGORIES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Thanh Bottom Navigation */}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Entypo name="shop" size={24} color="#181725" />
          <Text style={styles.tabLabel}>Shop</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="search" size={24} color="#53B175" />
          <Text style={[styles.tabLabel, { color: '#53B175' }]}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="cart-outline" size={24} color="#181725" />
          <Text style={styles.tabLabel}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
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
  headerTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
  searchContainer: { 
    flexDirection: 'row', backgroundColor: '#F2F3F2', 
    marginHorizontal: 25, borderRadius: 15, padding: 15, 
    alignItems: 'center', marginTop: 20, marginBottom: 20 
  },
  searchInput: { marginLeft: 10, fontSize: 16, flex: 1, fontWeight: '600' },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  categoryCard: {
    flex: 1,
    margin: 8,
    height: 190,
    borderRadius: 18,
    borderWidth: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: 100, height: 80, marginBottom: 15 },
  categoryTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#181725' },
  
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