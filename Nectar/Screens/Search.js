import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TextInput, 
  Image, TouchableOpacity, SafeAreaView 
} from 'react-native';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';

// --- DATA ---
const SEARCH_RESULTS = [
  { id: '1', name: 'Egg Red', weight: '4pcs', price: '$1.99', image: require('../assets/roTrung.png') },
  { id: '2', name: 'Egg White', weight: '180g', price: '$1.50', image: require('../assets/roTrungChauA.png') },
  { id: '3', name: 'Egg Pasta', weight: '30g', price: '$15.99', image: require('../assets/EggPasta.png') },
  { id: '4', name: 'Egg Noodles', weight: '2kg', price: '$15.99', image: require('../assets/EggNoodles.png') },
  { id: '5', name: 'Mayonnais Eggless', weight: '1.5kg', price: '$15.99', image: require('../assets/MayonnaisEggless.png') },
  { id: '6', name: 'Egg Noodles Blue', weight: '250g', price: '$15.99', image: require('../assets/miTim.png') },
];

export default function Search({ navigation }) {
  const [searchText, setSearchText] = useState('Egg');

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.productWeight}>{item.weight}, Price</Text>

      <View style={styles.cardFooter}>
        <Text style={styles.productPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.searchWrapper}>
          <Feather name="search" size={20} color="#181725" />
          <TextInput 
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholder="Search Store"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={18} color="#7C7C7C" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity 
          style={styles.filterBtn}
          onPress={() => navigation.navigate('Filters')}
        >
          <Ionicons name="options-outline" size={24} color="#181725" />
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={SEARCH_RESULTS}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      />

      {/* 🔥 BOTTOM TAB */}
      <View style={styles.bottomTab}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Entypo name="shop" size={24} color="#181725" />
          <Text style={styles.tabLabel}>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Feather name="search" size={24} color="#53B175" />
          <Text style={[styles.tabLabel, { color: '#53B175' }]}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart-outline" size={24} color="#181725" />
          <Text style={styles.tabLabel}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Favorites')}
        >
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

  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginTop: 20, 
    marginBottom: 10 
  },

  searchWrapper: { 
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: '#F2F3F2', 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    height: 50, 
    alignItems: 'center' 
  },

  searchInput: { 
    flex: 1, 
    marginLeft: 10, 
    fontSize: 16, 
    fontWeight: '600' 
  },

  filterBtn: { marginLeft: 15 },

  productCard: {
    flex: 1,
    margin: 10,
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E2E2'
  },

  productImage: { width: '100%', height: 100, marginBottom: 15 },

  productName: { fontSize: 16, fontWeight: 'bold' },
  productWeight: { fontSize: 14, color: '#7C7C7C', marginVertical: 5 },

  cardFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 10 
  },

  productPrice: { fontSize: 18, fontWeight: 'bold' },

  addBtn: { 
    backgroundColor: '#53B175', 
    padding: 8, 
    borderRadius: 12 
  },

  // 🔥 TAB
  bottomTab: { 
    flexDirection: 'row',
    height: 90,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 20
  },

  tabItem: { alignItems: 'center' },

  tabLabel: { fontSize: 12, marginTop: 5 }
});