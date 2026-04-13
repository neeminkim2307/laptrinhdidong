import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, 
  SafeAreaView, ScrollView 
} from 'react-native';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';

export default function ProductDetail({ navigation }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Image Section */}
        <View style={styles.imageContainer}>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="share-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          
          <Image 
  source={require('../assets/RedApple.png')}
  style={styles.productImage}
  resizeMode="contain"
/>
        </View>

        {/* Content Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.title}>Naturel Red Apple</Text>
              <Text style={styles.subtitle}>1kg, Price</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={28} color="#7C7C7C" />
            </TouchableOpacity>
          </View>

          {/* Quantity and Price */}
          <View style={styles.priceRow}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
                <Entypo name="minus" size={24} color="#B3B3B3" />
              </TouchableOpacity>
              <View style={styles.quantityBadge}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Entypo name="plus" size={24} color="#53B175" />
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>$4.99</Text>
          </View>

          <View style={styles.divider} />

          {/* Accordion Sections */}
          <TouchableOpacity style={styles.accordionHeader}>
            <Text style={styles.sectionTitle}>Product Detail</Text>
            <Ionicons name="chevron-down" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.description}>
            Apples are nutritious. Apples may be good for weight loss. 
            Apples may be good for your heart. As part of a healthful and varied diet.
          </Text>

          <TouchableOpacity style={[styles.accordionHeader, { marginTop: 20 }]}>
            <Text style={styles.sectionTitle}>Nutritions</Text>
            <View style={styles.row}>
               <View style={styles.nutritionBadge}><Text style={{fontSize: 10}}>100gr</Text></View>
               <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.accordionHeader, { marginTop: 20 }]}>
            <Text style={styles.sectionTitle}>Review</Text>
            <View style={styles.row}>
               <View style={styles.stars}>
                 {[1,2,3,4,5].map((s) => <Ionicons key={s} name="star" size={16} color="#F3603F" />)}
               </View>
               <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.basketBtn}>
          <Text style={styles.basketBtnText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageContainer: {
    height: 300,
    backgroundColor: '#F2F3F2',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtons: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productImage: { width: '80%', height: '70%' },
  detailsContainer: { padding: 25 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  subtitle: { fontSize: 16, color: '#7C7C7C', marginTop: 5 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityBadge: {
    borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 15,
    paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 15
  },
  quantityText: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  divider: { height: 1, backgroundColor: '#E2E2E2', marginVertical: 10 },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  description: { color: '#7C7C7C', lineHeight: 21, marginTop: 10 },
  row: { flexDirection: 'row', alignItems: 'center' },
  nutritionBadge: { backgroundColor: '#EBEBEB', padding: 4, borderRadius: 5, marginRight: 10 },
  stars: { flexDirection: 'row', marginRight: 10 },
  footer: { padding: 25 },
  basketBtn: { backgroundColor: '#53B175', borderRadius: 19, paddingVertical: 24, alignItems: 'center' },
  basketBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});