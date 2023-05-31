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
export default function Profile({ navigation }) {
  const isFocused = useIsFocused();
  const [image, setImage] = useState(null);
  const [account, setAccount] = useState(null);
  const [visible, setVisible] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});
  const [countQuantityOrder, setCountQuantityOrder] = useState({});

  // console.log(account.data.userId);
  const [linkImage, setLinkImage] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const imageArr = [
    {
      url: "https://www.sonha.net.vn/media/news/0310_khuyen-mai-son-ha-10-10.jpg",
    },
  ];
  const getAccount = async () => {
    const accountFromStorage = await AsyncStorage.getItem("account");
    setAccount(JSON.parse(accountFromStorage));
    getAccountInfo(accountFromStorage);
    getCountOrder(JSON.parse(accountFromStorage));
  };
  const getAccountInfo = async (accountId) => {
    setVisible(true);
    const result = await getAccountInfoAPI(accountId);
    //console.log(result);
    if (result.status == 200) {
      setVisible(false);
      setAccountInfo(result.data.data.customers.md_customer_info);
      //console.log(result.data.data.customers);
    } else {
      setVisible(false);
      // Alert.alert("Thông báo", "Sự cố lấy thông tin");
    }
  };
  const getCountOrder = async (account) => {
    const result = await countOrder(account);
    if (result.status === 200) {
      setCountQuantityOrder(result.data.data.resCount);
    }
  };
  useEffect(() => {
    getAccount();
  }, [isFocused]);
  const removeAccountFromStorage = async () => {
    try {
      await AsyncStorage.removeItem("account");
    } catch (error) {
      Alert.alert("Thông báo", "Lỗi hệ thống");
    }
  };
  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled && typeof result.assets[0].uri === "string") {
        setImage(result.assets[0].uri);
        // console.log(result.assets[0].uri);
      }
    } catch {
      Alert.alert("Thông báo", "Cập nhật thất bại");
    }
  };

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
        <Text style={styles.returnText}>Cá nhân</Text>
      </View>
      <ScrollView
        style={{ height: "91%" }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View>
            <View
              style={{
                position: "absolute",
                zIndex: 1,
                marginTop: 80,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                  borderWidth: 3,
                  borderColor: "#ffffff",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#cccccc",
                  flexDirection: "row",
                }}
              >
                {accountInfo.firstname && (
                  <Text style={{ fontSize: 50, fontWeight: "bold" }}>
                    {accountInfo.firstname.charAt(0)}
                  </Text>
                )}
                {accountInfo.lastname && (
                  <Text style={{ fontSize: 50, fontWeight: "bold" }}>
                    {accountInfo.lastname.charAt(0)}
                  </Text>
                )}
              </View>

              {accountInfo.firstname && (
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  {accountInfo.firstname + " " + accountInfo.lastname}
                </Text>
              )}
            </View>
            <Image
              style={{
                width: "100%",
                height: 200,
              }}
              source={{
                uri: "https://www.sonha.net.vn/media/news/0310_khuyen-mai-son-ha-10-10.jpg",
              }}
            />
          </View>
        </View>
        {accountInfo && (
          <View
            style={{
              marginTop: 60,
              marginLeft: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
                marginLeft: 1,
              }}
            >
              {accountInfo.gender && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="intersex" size={22} />
                  <Text style={{ marginLeft: 10, fontSize: 15 }}>
                    {"Giới tính: " + (accountInfo.gender === 1 ? "Nam" : "Nữ")}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              {accountInfo.birthday && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather name="calendar" size={20} />
                  <Text style={{ marginLeft: 10, fontSize: 15 }}>
                    {"Ngày sinh: " +
                      new Date(accountInfo.birthday).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              {accountInfo.phoneNumber && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather name="phone" size={20} />
                  <Text style={{ marginLeft: 10, fontSize: 15 }}>
                    {"Số điện thoại: " + accountInfo.phoneNumber}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              {accountInfo.email && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather name="mail" size={20} />
                  <Text style={{ marginLeft: 10, fontSize: 15 }}>
                    {"Email: " + accountInfo.email}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                marginTop: 10,
              }}
            >
              {accountInfo.address && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather name="map-pin" size={20} />
                  <Text style={{ marginLeft: 10, fontSize: 15 }}>
                    {"Địa chỉ: " + accountInfo.address}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <FontAwesome name="reorder" size={25} />
            <Text style={{ fontSize: 18, marginLeft: 10 }}>Đơn mua</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("orderList", { screen: "Hoàn tất" });
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Lịch sử mua hàng</Text>
            <Feather name="chevron-right" size={15} style={{ marginTop: 1 }} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            height: 100,
            marginHorizontal: 15,
            borderRadius: 10,
            backgroundColor: "#ffffff",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("orderList", { screen: "Chờ xác nhận" });
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View>
              <FontAwesome name="credit-card" size={30} />
              <View
                style={{
                  position: "absolute",
                  top: -7,
                  right: -8,
                  backgroundColor: "#FF4B3A",
                  width: 22,
                  height: 22,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#ffffff" }}>
                  {countQuantityOrder.confirmWaiting
                    ? countQuantityOrder.confirmWaiting
                    : null}
                </Text>
              </View>
            </View>
            <Text style={{ textAlign: "center" }}>Chờ xác nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("orderList", { screen: "Chờ lấy hàng" });
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View>
              <Feather name="box" size={30} />
              <View
                style={{
                  position: "absolute",
                  top: -7,
                  right: -8,
                  backgroundColor: "#FF4B3A",
                  width: 22,
                  height: 22,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#ffffff" }}>
                  {countQuantityOrder.outputWaiting
                    ? countQuantityOrder.outputWaiting
                    : null}
                </Text>
              </View>
            </View>
            <Text style={{ textAlign: "center" }}>Chờ lấy hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("orderList", { screen: "Đang giao" });
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View>
              <Feather name="truck" size={30} />
              <View
                style={{
                  position: "absolute",
                  top: -7,
                  right: -8,
                  backgroundColor: "#FF4B3A",
                  width: 22,
                  height: 22,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#ffffff" }}>
                  {countQuantityOrder.deliverying
                    ? countQuantityOrder.deliverying
                    : null}
                </Text>
              </View>
            </View>
            <Text style={{ textAlign: "center" }}>Đang giao</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (account == null) {
              Alert.alert("Thông báo", "Bạn chưa đăng nhập");
            } else {
              navigation.navigate("profileEdit", { account: account });
            }
          }}
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 15,
              paddingVertical: 15,
            }}
          >
            <Feather name="user" size={25} />
            <Text style={{ fontSize: 17, marginLeft: 10 }}>
              Cập nhật thông tin cá nhân
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("addressScreen", {
              account: account,
            });
          }}
          style={{
            marginTop: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 15,
              paddingVertical: 15,
            }}
          >
            <Entypo name="location" size={25} />
            <Text style={{ fontSize: 17, marginLeft: 10 }}>Địa chỉ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 15,
              paddingVertical: 15,
            }}
          >
            <Feather name="lock" size={25} />
            <Text style={{ fontSize: 17, marginLeft: 10 }}>Đổi mật khẩu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 15,
              paddingVertical: 15,
            }}
          >
            <Feather name="git-pull-request" size={25} />
            <Text style={{ fontSize: 17, marginLeft: 10 }}>
              Trung tâm trợ giúp
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (account == null) {
              navigation.navigate("signInScreen");
              //console.log("Huy1");
            } else {
              Alert.alert("Thông báo", "Bạn đã đăng nhập");
            }
          }}
          style={{
            marginTop: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 15,
              paddingVertical: 15,
            }}
          >
            <AntDesign name="login" size={25} />
            <Text style={{ fontSize: 17, marginLeft: 10 }}>Đăng nhập</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (account == null) {
              Alert.alert("Thông báo", "Bạn chưa đăng nhập");
            } else {
              removeAccountFromStorage();
              navigation.navigate("flashScreen");
            }
          }}
          style={{
            marginTop: 1,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            backgroundColor: "#ffffff",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 15,
              paddingVertical: 15,
            }}
          >
            <Feather name="log-out" size={25} />
            <Text style={{ fontSize: 17, marginLeft: 10 }}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
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
