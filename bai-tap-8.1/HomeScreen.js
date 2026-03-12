import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";

export default function HomeScreen() {

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Explorer</Text>

      {/* Search */}
      <TextInput
        style={styles.search}
        placeholder="Search for meals or area"
      />

      {/* Categories */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Categories</Text>
        <Text style={styles.filter}>Filter</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>

        <View style={styles.category}>
          <Image
            source={{uri:"https://i.imgur.com/0umadnY.jpg"}}
            style={styles.categoryImage}
          />
          <Text>Pizza</Text>
        </View>

        <View style={styles.category}>
          <Image
            source={require("./assets/images/burger.jpg")}
            style={styles.categoryImage}
          />
          <Text>Burgers</Text>
        </View>

        <View style={styles.category}>
          <Image
            source={require("./assets/images/steak.jpg")}
            style={styles.categoryImage}
          />
          <Text>Steak</Text>
        </View>

      </ScrollView>

      {/* Popular Items */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Items</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      <View style={styles.card}>
        <Image
          source={require("./assets/images/food1.jpg")}
          style={styles.cardImage}
        />

        <View>
          <Text style={styles.foodTitle}>Food 1</Text>
          <Text style={styles.foodSub}>By Viet Nam</Text>
          <Text style={styles.price}>1$</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Image
          source={require("./assets/images/food2.jpg")}
          style={styles.cardImage}
        />

        <View>
          <Text style={styles.foodTitle}>Food 2</Text>
          <Text style={styles.foodSub}>By Viet Nam</Text>
          <Text style={styles.price}>3$</Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:15,
    backgroundColor:"#f5f5f5"
  },

  title:{
    fontSize:24,
    fontWeight:"bold",
    marginBottom:15
  },

  search:{
    backgroundColor:"white",
    padding:12,
    borderRadius:8,
    marginBottom:20
  },

  sectionHeader:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:10
  },

  sectionTitle:{
    fontWeight:"bold",
    fontSize:16
  },

  filter:{
    color:"orange"
  },

  viewAll:{
    color:"orange"
  },

  category:{
    marginRight:15,
    alignItems:"center"
  },

  categoryImage:{
    width:80,
    height:60,
    borderRadius:8,
    marginBottom:5
  },

  card:{
    backgroundColor:"white",
    flexDirection:"row",
    padding:10,
    borderRadius:10,
    marginBottom:10
  },

  cardImage:{
    width:70,
    height:70,
    borderRadius:8,
    marginRight:10
  },

  foodTitle:{
    fontWeight:"bold"
  },

  foodSub:{
    color:"gray"
  },

  price:{
    marginTop:5
  }

});