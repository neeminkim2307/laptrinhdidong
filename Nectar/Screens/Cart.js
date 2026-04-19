import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, Image, 
  TouchableOpacity, SafeAreaView, Modal 
} from 'react-native';
import { Ionicons, Feather, MaterialIcons, Entypo } from '@expo/vector-icons';

const INITIAL_CART = [
  { id: '1', name: 'Bell Pepper Red', weight: '1kg', price: 4.99, quantity: 1, image: require('../assets/bellpepper.png') },
  { id: '2', name: 'Egg Chicken Red', weight: '4pcs', price: 1.99, quantity: 1, image: require('../assets/roTrung.png') },
  { id: '3', name: 'Organic Bananas', weight: '12kg', price: 3.00, quantity: 1, image: require('../assets/banana.jpg') },
  { id: '4', name: 'Ginger', weight: '250g', price: 2.99, quantity: 1, image: require('../assets/ginger.png') },
];

export default function Cart({ navigation }) {
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const updateQuantity = (id, type) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const newQty = type === 'add' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updated);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      <View style={styles.itemInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity onPress={() => setCartItems(cartItems.filter(i => i.id !== item.id))}>
            <Ionicons name="close" size={24} color="#B3B3B3" />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemWeight}>{item.weight}, Price</Text>

        <View style={styles.actionRow}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, 'sub')}>
              <Feather name="minus" size={20} color="#B3B3B3" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, 'add')}>
              <Feather name="plus" size={20} color="#53B175" />
            </TouchableOpacity>
          </View>

          <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {/* LIST */}
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 160 }}
      />

      {/* CHECKOUT BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.checkoutBtn} 
          onPress={() => setIsCheckoutVisible(true)}
        >
          <View style={styles.btnContent}>
            <Text style={styles.checkoutText}>Go to Checkout</Text>
            <View style={styles.priceTag}>
              <Text style={styles.totalPriceText}>${getTotalPrice()}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal
        visible={isCheckoutVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCheckoutVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Checkout</Text>
              <TouchableOpacity onPress={() => setIsCheckoutVisible(false)}>
                <Ionicons name="close" size={28} />
              </TouchableOpacity>
            </View>

            <Text style={{marginTop: 10}}>Total: ${getTotalPrice()}</Text>

            <TouchableOpacity 
              style={styles.placeOrderBtn}
              onPress={() => {
                setIsCheckoutVisible(false);
                alert("Order Placed!");
              }}
            >
              <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

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

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="cart-outline" size={24} color="#53B175" />
          <Text style={[styles.tabLabel, { color: '#53B175' }]}>Cart</Text>
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

  header: { paddingVertical: 20, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },

  cartItem: { flexDirection: 'row', paddingVertical: 20 },
  itemImage: { width: 80, height: 80, marginRight: 20 },
  itemInfo: { flex: 1 },

  nameRow: { flexDirection: 'row', justifyContent: 'space-between' },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  itemWeight: { color: '#7C7C7C', marginVertical: 5 },

  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },

  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 15, padding: 8 },
  qtyText: { marginHorizontal: 15, fontWeight: 'bold' },

  itemPrice: { fontSize: 18, fontWeight: 'bold' },

  footer: { position: 'absolute', bottom: 100, width: '100%', paddingHorizontal: 20 },
  checkoutBtn: { backgroundColor: '#53B175', borderRadius: 19, height: 65, justifyContent: 'center' },
  btnContent: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },

  checkoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  priceTag: { position: 'absolute', right: 20, backgroundColor: '#489E67', paddingHorizontal: 10, borderRadius: 5 },
  totalPriceText: { color: '#fff', fontWeight: 'bold' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between' },

  placeOrderBtn: { backgroundColor: '#53B175', borderRadius: 19, height: 60, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  placeOrderText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

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