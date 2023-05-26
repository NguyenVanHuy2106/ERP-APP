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
import { Card } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { getAccountInfoAPI, countOrder } from "../../helper/controller/profile";
import { getBannerAPI } from "../../helper/controller/promotion";
import { getModelByMainGroup } from "../../helper/controller/shop";
export default function PromotionDetail({ navigation, route }) {
  const isFocused = useIsFocused();
  const promotionProgram = route.params.promotionProgram;
  //console.log(promotionProgram);
  const [account, setAccount] = useState(null);
  const [visible, setVisible] = useState(false);
  const [bannerList, setBannerList] = useState([]);
  const [modelList, setModelList] = useState([]);
  //console.log(modelList);
  const getAccount = async () => {
    const accountFromStorage = await AsyncStorage.getItem("account");
    setAccount(JSON.parse(accountFromStorage));
  };
  //   const getBanner = async () => {
  //     const resutl = await getBannerAPI(null, null);
  //     if (resutl.status === 200) {
  //       setBannerList(resutl.data.data);
  //     }
  //   };
  const getAllModel = async () => {
    setVisible(true);
    if (promotionProgram.subgroupId !== null) {
      // mainGroupId,
      // subgroupId,
      // brandId,
      // limit
      const result = await getModelByMainGroup(
        null,
        promotionProgram.subgroupId,
        null,
        1000
      );
      //console.log(result);
      if (result.status === 200) {
        setVisible(false);
        setModelList(result.data.data.modelList);
        //console.log(result.data);
      }
    }
  };
  useEffect(() => {
    getAccount();
    getAllModel();
    // getBanner();
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
        <Text style={styles.returnText}>Chi tiết khuyến mãi</Text>
      </View>

      <ScrollView
        style={{ height: "90%" }}
        contentContainerStyle={{ justifyContent: "center" }}
      >
        <View
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
            {promotionProgram.promotionProgramName}
          </Text>
          <Image
            style={{
              width: 380,
              height: 200,
              borderRadius: 10,
            }}
            source={{
              uri: promotionProgram.bannerImagePath,
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
              new Date(promotionProgram.fromDate).toLocaleDateString() +
              " - " +
              new Date(promotionProgram.toDate).toLocaleDateString()}
          </Text>
        </View>
        {modelList && (
          <View
            // style={{
            //   zIndex: 2,
            //   flexDirection: "row",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   flexWrap: "wrap",
            //   marginTop: 5,
            // }}
            style={{
              zIndex: 2,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              flexWrap: "wrap",
              paddingHorizontal: 6,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            {modelList.map((item, index) => {
              return (
                <View key={index}>
                  {item.promotionProgramId !== null && (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("shopDetailScreen", {
                          modelId: item.modelId,
                          modelPrice: item.modelPrice,
                          maingroupId: item.maingroupId,
                          subgroupId: item.subgroupId,
                          modelStockAmount: item.amount,
                        });
                      }}
                    >
                      <Card
                        containerStyle={{
                          marginLeft: 5,
                          marginRight: 5,
                          marginTop: 5,
                          marginBottom: 5,
                          width: 190,
                          height: 270,
                          borderWidth: 0,
                          shadowColor: "#EEEEEE",
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 0.8,
                          shadowRadius: 2,
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              source={{
                                uri: item.modelImagePath
                                  ? item.modelImagePath
                                  : "https://icon-library.com/images/image-icon-png/image-icon-png-6.jpg",
                              }}
                              style={{
                                width: 150,
                                height: 150,
                                marginLeft: 0,
                                marginRight: 0,
                                borderRadius: 10,
                              }}
                            />
                            <View style={{ marginTop: 20 }}>
                              <Text
                                style={{
                                  width: 170,
                                  textAlign: "center",
                                  fontSize: 15,
                                }}
                              >
                                {item.modelName}
                              </Text>
                            </View>
                            {item.promotionProgramId !== null && (
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 15,
                                    textDecorationLine: "line-through",
                                  }}
                                >
                                  {"đ" + item.modelPrice.toLocaleString()}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: "#ff0000",
                                    paddingLeft: 4,
                                  }}
                                >
                                  {item.isPercentValue === 1
                                    ? "-" + item.value + "%"
                                    : "-" + item.value}
                                </Text>
                              </View>
                            )}
                            <View>
                              <Text
                                style={{
                                  fontSize: 17,
                                  fontWeight: "bold",
                                  color: "#ff0000",
                                }}
                              >
                                {"đ" + item.discountValue.toLocaleString()}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

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
