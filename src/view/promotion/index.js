import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";

import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { getAccountInfoAPI, countOrder } from "../../helper/controller/profile";
import { getBannerAPI } from "../../helper/controller/promotion";

export default function Promotion({ navigation }) {
  const isFocused = useIsFocused();

  const [account, setAccount] = useState(null);
  const [visible, setVisible] = useState(false);
  const [bannerList, setBannerList] = useState([]);

  const getAccount = async () => {
    const accountFromStorage = await AsyncStorage.getItem("account");
    setAccount(JSON.parse(accountFromStorage));
  };
  const getBanner = async () => {
    const resutl = await getBannerAPI(null, null);
    if (resutl.status === 200) {
      setBannerList(resutl.data.data);
    }
  };

  useEffect(() => {
    getAccount();
    getBanner();
  }, [isFocused]);
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
        <Text style={styles.returnText}>Khuyến mãi</Text>
      </View>

      <View style={{ height: "90%" }}>
        <FlatList
          data={bannerList}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("promotionDetail", {
                    promotionProgram: item,
                  });
                  //console.log(item.promotionProgramId);
                }}
                key={index}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FFF8E7",
                  borderRadius: 10,
                  marginLeft: 8,
                  marginRight: 8,
                  marginTop: 8,
                  padding: 8,
                  shadowColor: "#007FFF",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    paddingBottom: 8,
                    fontWeight: "bold",
                  }}
                >
                  {item.promotionProgramName}
                </Text>
                <Image
                  style={{
                    width: 380,
                    height: 200,
                    borderRadius: 10,
                  }}
                  source={{
                    uri: item.bannerImagePath,
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    paddingVertical: 6,
                    fontStyle: "italic",
                  }}
                >
                  {"Thời gian áp dụng: " +
                    new Date(item.fromDate).toLocaleDateString() +
                    " - " +
                    new Date(item.toDate).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <Modal visible={visible} transparent={true}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              padding: 10,
              borderRadius: 5,
            }}
            transparent="30%"
          >
            <ActivityIndicator size="large" />
          </View>
        </View>
      </Modal>
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
