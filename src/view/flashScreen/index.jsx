import React from "react";
import { useTheme } from "@react-navigation/native";

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function FlashScreen({ navigation }) {
  const { colors } = useTheme();
  global.userId = null;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo/logo1.png")}
          style={{ width: 250, height: 250 }}
        ></Image>
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Welcome to ERP App</Text>
        <Text style={styles.text}>Sign in with account</Text>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.navigate("dashboardScreen")}
            //onPress={() => navigation.navigate("completedOrder")}
          >
            <LinearGradient
              colors={["#FF4B3A", "#FF4B3A"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Bắt đầu</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF4B3A",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  title: {
    color: "#05375a",
    fontSize: 35,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
    fontSize: 20,
  },
});
