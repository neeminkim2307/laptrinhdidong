import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "./AuthContext";

export default function AccountScreen() {

  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Account</Text>

      {/* Banner */}
      <View style={styles.banner}></View>

      <View style={styles.profile}>

        <Text style={styles.name}>Hung Nguyen</Text>

        <Text style={styles.job}>Mobile developer</Text>

        <Text style={styles.desc}>
          I have above 5 years of experience in native
          mobile apps development, now i am learning
          React Native
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={logout}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#f5f5f5"
  },

  title:{
    fontSize:22,
    fontWeight:"bold",
    padding:15
  },

  banner:{
    height:150,
    backgroundColor:"#20a8d8"
  },

  profile:{
    alignItems:"center",
    padding:25
  },

  name:{
    fontSize:24,
    fontWeight:"bold",
    marginTop:20
  },

  job:{
    color:"#20a8d8",
    marginTop:5,
    marginBottom:10
  },

  desc:{
    textAlign:"center",
    color:"gray",
    marginBottom:20
  },

  button:{
    backgroundColor:"orange",
    paddingVertical:10,
    paddingHorizontal:25,
    borderRadius:6
  },

  buttonText:{
    color:"white",
    fontWeight:"bold"
  }

});