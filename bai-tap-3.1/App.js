import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={squareStyle.container}>
        <Text>Hello, world!</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const squareStyle = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    backgroundColor: "#f542e0",
    alignItems: "center",
    justifyContent: "center",
  },
});