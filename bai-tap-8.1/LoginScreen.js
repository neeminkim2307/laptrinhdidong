import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { AuthContext } from "./AuthContext";

export default function LoginScreen() {

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Sign In</Text>

      <Text style={styles.label}>Email ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email here!"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password here!"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.forgot}>Forgot password?</Text>

      <TouchableOpacity
        style={styles.signinBtn}
        onPress={() => login(email, password)}
      >
        <Text style={styles.signinText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.or}>Or sign in with</Text>

      <View style={styles.socialContainer}>

        <TouchableOpacity style={styles.googleBtn}>
          <Text>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.facebookBtn}>
          <Text style={{ color: "white" }}>Facebook</Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.signup}>
        Not yet a member? <Text style={{color:"orange"}}>Sign Up</Text>
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:25,
    backgroundColor:"#f5f5f5",
    justifyContent:"center"
  },

  title:{
    fontSize:28,
    fontWeight:"bold",
    textAlign:"center",
    marginBottom:40
  },

  label:{
    fontWeight:"bold",
    marginBottom:5
  },

  input:{
    borderWidth:1,
    borderColor:"#ccc",
    padding:12,
    borderRadius:6,
    marginBottom:15,
    backgroundColor:"#fff"
  },

  forgot:{
    textAlign:"right",
    color:"orange",
    marginBottom:20
  },

  signinBtn:{
    backgroundColor:"orange",
    padding:15,
    borderRadius:6,
    alignItems:"center",
    marginBottom:20
  },

  signinText:{
    color:"white",
    fontWeight:"bold"
  },

  or:{
    textAlign:"center",
    marginBottom:15
  },

  socialContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:20
  },

  googleBtn:{
    borderWidth:1,
    borderColor:"#ccc",
    padding:12,
    width:"48%",
    alignItems:"center",
    borderRadius:6,
    backgroundColor:"white"
  },

  facebookBtn:{
    backgroundColor:"#4267B2",
    padding:12,
    width:"48%",
    alignItems:"center",
    borderRadius:6
  },

  signup:{
    textAlign:"center"
  }

});