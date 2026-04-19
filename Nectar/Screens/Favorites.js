import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image,
  TouchableOpacity, SafeAreaView
} from 'react-native';
import { Ionicons, Feather, Entypo } from '@expo/vector-icons';

const INITIAL_FAVORITES = [
  { id: '1', name: 'Sprite Can', weight: '325ml', price: 1.50, image: require('../assets/SpriteCan.png') },
  { id: '2', name: 'Diet Coke', weight: '355ml', price: 1.99, image: require('../assets/DietCoke.png') },
  { id: '3', name: 'Apple & Grape Juice', weight: '2L', price: 15.50, image: require('../assets/Applegrape.png') },
  { id: '4', name: 'Coca Cola Can', weight: '325ml', price: 4.99, image: require('../assets/CocaColaCan.png') },
  { id: '5', name: 'Pepsi Can', weight: '330ml', price: 4.99, image: require('../assets/PepsiCan.png') },
];

export default function Favorites({ navigation }) {
  const [items, setItems] = useState(INITIAL_FAVORITES);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.weight}>{item.weight}, Price</Text>
      </View>

      <Text style={styles.price}>${item.price.toFixed(2)}</Text>

      <Ionicons name="chevron-forward" size={20} color="#B3B3B3" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourite</Text>
      </View>

      {/* LIST */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 160 }}
      />

      {/* BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addAllBtn}>
          <Text style={styles.addAllText}>Add All To Cart</Text>
        </TouchableOpacity>
      </View>

      {/* 🔥 BOTTOM TAB */}
      <View style={styles.bottomTab}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Entypo name="shop" size={24} color="#181725" />
          <Text style={styles.tabLabel}>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Explore')}
        >
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

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="heart" size={24} color="#53B175" />
          <Text style={[styles.tabLabel, { color: '#53B175' }]}>Favourite</Text>
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
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2'
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20
  },

  image: { width: 60, height: 60, marginRight: 15 },

  name: { fontSize: 16, fontWeight: 'bold' },
  weight: { color: '#7C7C7C', marginTop: 5 },

  price: { fontSize: 16, fontWeight: 'bold', marginRight: 10 },

  separator: { height: 1, backgroundColor: '#E2E2E2' },

  footer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    paddingHorizontal: 20
  },

  addAllBtn: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },

  addAllText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
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