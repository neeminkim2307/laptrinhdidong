import React from 'react';
import { 
  View, Text, StyleSheet, FlatList, Image, 
  TouchableOpacity, SafeAreaView 
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

// --- DỮ LIỆU ĐỒ UỐNG ĐÃ CẬP NHẬT ẢNH CỤC BỘ ---
const BEVERAGES_DATA = [
  { id: '1', name: 'Diet Coke', volume: '355ml', price: '$1.99', image: require('../assets/DietCoke.png') },
  { id: '2', name: 'Sprite Can', volume: '325ml', price: '$1.50', image: require('../assets/SpriteCan.png') },
  { id: '3', name: 'Apple & Grape Juice', volume: '2L', price: '$15.99', image: require('../assets/Applegrape.png') },
  { id: '4', name: 'Orange Juice', volume: '2L', price: '$15.99', image: require('../assets/OrengeJuice.png') },
  { id: '5', name: 'Coca Cola Can', volume: '325ml', price: '$4.99', image: require('../assets/CocaColaCan.png') },
  { id: '6', name: 'Pepsi Can', volume: '330ml', price: '$4.99', image: require('../assets/PepsiCan.png') },
];

export default function Beverages({ navigation }) {
  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productVolume}>{item.volume}, Price</Text>
      </View>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <AntDesign name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Beverages</Text>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={BEVERAGES_DATA}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  listContent: { paddingHorizontal: 15, paddingBottom: 20 },
  card: {
    flex: 1,
    margin: 8,
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    backgroundColor: '#fff',
    minHeight: 250,
    justifyContent: 'space-between'
  },
  productImage: { width: '100%', height: 100, marginBottom: 15 },
  infoContainer: { marginBottom: 10 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  productVolume: { fontSize: 14, color: '#7C7C7C', marginTop: 5 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  addButton: { 
    backgroundColor: '#53B175', width: 45, height: 45, 
    borderRadius: 17, justifyContent: 'center', alignItems: 'center' 
  }
});