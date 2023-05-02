import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Card } from "react-native-elements";

export default function Notify({ navigation }) {
  const notify = [
    {
      id: 1,
      title: "Khuyến mãi",
      content:
        "Khuyến mại là hoạt động xúc tiến thương mại của thương nhân nhằm xúc tiến việc mua bán hàng hoá, cung ứng dịch vụ bằng cách dành cho khách hàng những lợi ích nhất định.",
    },
    {
      id: 2,
      title: "Khuyến mãi",
      content:
        "Khuyến mại là hoạt động xúc tiến thương mại của thương nhân nhằm xúc tiến việc mua bán hàng hoá, cung ứng dịch vụ bằng cách dành cho khách hàng những lợi ích nhất định.",
    },
    {
      id: 3,
      title: "Khuyến mãi",
      content:
        "Khuyến mại là hoạt động xúc tiến thương mại của thương nhân nhằm xúc tiến việc mua bán hàng hoá, cung ứng dịch vụ bằng cách dành cho khách hàng những lợi ích nhất định.",
    },
    {
      id: 4,
      title: "Khuyến mãi",
      content:
        "Khuyến mại là hoạt động xúc tiến thương mại của thương nhân nhằm xúc tiến việc mua bán hàng hoá, cung ứng dịch vụ bằng cách dành cho khách hàng những lợi ích nhất định. Khuyến mại là hoạt động xúc tiến thương mại của thương nhân nhằm xúc tiến việc mua bán hàng hoá, cung ứng dịch vụ bằng cách dành cho khách hàng những lợi ích nhất định.",
    },
    {
      id: 5,
      title: "Khuyến mãi",
      content:
        "Khuyến mại là hoạt động xúc tiến thương mại của thương nhân nhằm xúc tiến việc mua bán hàng hoá, cung ứng dịch vụ bằng cách dành cho khách hàng những lợi ích nhất định.",
    },
  ];
  return (
    <View>
      <View style={styles.return}>
        <View style={styles.returnIcon}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesome name="arrow-left" color="#ffffff" size={20} />
          </TouchableOpacity>
        </View>
        <Text style={styles.returnText}>Thông báo</Text>
        {/* <View style={{ marginRight: 15, marginTop: 10 }}>
          <Ionicons name="checkmark-done-sharp" size={30} />
        </View> */}
        <View style={styles.returnIcon}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="checkmark-done-sharp" color="#ffffff" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ height: "95%" }}>
        <View>
          {notify.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#ffffff",
                marginTop: 4,
                marginBottom: 1,
              }}
            >
              <View style={{ marginLeft: 25 }}>
                <Ionicons
                  name="notifications-outline"
                  size={30}
                  color="#ff0000"
                />
              </View>
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  marginBottom: 10,
                  width: "77%",
                }}
              >
                <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                  {item.title}
                </Text>
                <Text style={{ flexWrap: "wrap", textAlign: "justify" }}>
                  {item.content}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  return: {
    height: 80,
    backgroundColor: "#FF4B3A",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  returnIcon: {
    flex: 0.7,
    marginLeft: 15,
    //borderWidth: 1,
  },
  returnText: {
    flex: 2,
    //borderWidth: 1,
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
    marginRight: 75,
  },
});
