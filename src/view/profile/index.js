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
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useIsFocused } from "@react-navigation/native";
import { getAccountInfoAPI } from "../../helper/controller/profile";
export default function Profile({ navigation }) {
  const isFocused = useIsFocused();
  const [image, setImage] = useState(null);
  const [account, setAccount] = useState(null);
  const [visible, setVisible] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});

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
  };
  const getAccountInfo = async (accountId) => {
    setVisible(true);
    const result = await getAccountInfoAPI(accountId);
    if (result.status == 200) {
      setVisible(false);
      setAccountInfo(result.data.data.customers.md_customer_info);
      //console.log(result.data.data.customers);
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
              <TouchableOpacity
                onPress={selectImage}
                style={{
                  zIndex: 2,
                  position: "absolute",
                  bottom: 40,
                  right: 10,
                  backgroundColor: "#ffffff",
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome name="camera" size={15} />
              </TouchableOpacity>

              <Image
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                  borderWidth: 3,
                  borderColor: "#ffffff",
                }}
                source={{
                  uri: image,
                }}
              />

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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Lịch sử mua hàng</Text>
            <Feather name="chevron-right" size={15} style={{ marginTop: 1 }} />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,

            height: 100,
            marginHorizontal: 15,
            borderRadius: 10,
            backgroundColor: "#ffffff",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <FontAwesome name="credit-card" size={25} />
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
                <Text style={{ color: "#ffffff" }}>2</Text>
              </View>
            </View>
            <Text>Chờ xác nhận</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
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
                <Text style={{ color: "#ffffff" }}>2</Text>
              </View>
            </View>
            <Text>Chờ lấy hàng</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
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
                <Text style={{ color: "#ffffff" }}>2</Text>
              </View>
            </View>
            <Text>Đang giao</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <Feather name="server" size={25} />
            <Text style={{ fontSize: 18, marginLeft: 10 }}>Tiện ích</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
            backgroundColor: "#ffffff",
            height: 100,
            marginHorizontal: 15,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="heart-o" size={25} />
            <Text>Yêu thích</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Feather name="tag" size={25} />
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
                <Text style={{ color: "#ffffff" }}>2</Text>
              </View>
            </View>
            <Text>Khuyến mãi</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="opencart" size={25} />
            <Text>Mua lại</Text>
          </View>
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
