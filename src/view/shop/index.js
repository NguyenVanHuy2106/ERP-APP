import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { Card } from "react-native-elements";
import { getAllSubGroup } from "../../helper/controller/subGroup";
import { getAllMainGroup } from "../../helper/controller/mainGroup";
import { getModelByMainGroup } from "../../helper/controller/shop";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
export default function Shop({ navigation }) {
  const [dataSearch, setDataSearch] = useState({
    textSearch: "",
  });
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [account, setAccount] = useState(null);
  const [subGroupList, setSubGroupList] = useState([]);
  const [mainGroupList, setMainGroupList] = useState([]);
  const [mainGroupIdSelect, setMainGroupIdSelect] = useState(null);
  //console.log(mainGroupIdSelect);
  const [modelList, setModelList] = useState([]);
  let limit = 20;
  const [limitA, setLimitA] = useState(limit);
  const textInputChange = (val) => {
    setDataSearch({
      ...dataSearch,
      textSearch: val,
    });
  };
  const getAccount = async () => {
    const accountFromStorage = await AsyncStorage.getItem("account");
    setAccount(JSON.parse(accountFromStorage));
  };
  const handleMaiGroupList = async () => {
    //setVisible(true);
    const result = await getAllMainGroup();
    if (result.status == 200) {
      //setVisible(false);
      setMainGroupList(result.data.data.maingroups);
      //console.log(result.data.data.maingroups[0].maingroupId);
      getModelByMainGroupId(
        result.data.data.maingroups[0].maingroupId,
        null,
        null,
        limitA
      );
      //console.log(result.data.data.subgroups);
    }
  };
  const getModelByMainGroupId = async (mainGroupId, subGroup, brand, limit) => {
    setVisible(true);
    const result = await getModelByMainGroup(
      mainGroupId,
      subGroup,
      brand,
      limit
    );
    if (result.status == 200) {
      setModelList(result.data.data.modelList);
      setVisible(false);
    } else {
      setVisible(true);
      Alert.alert("Thông báo", "Lỗi lấy dữ liệu");
    }
  };

  useEffect(() => {
    // if (global.userId == null) {
    //   console.log("Huy");
    // }
    getAccount();
    handleMaiGroupList();
  }, [isFocused]);
  // Đăng ký sự kiện

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
        <Text style={styles.returnText}>Cửa hàng</Text>
      </View>
      <ScrollView style={{ height: "90%" }}>
        <View style={styles.searchMargin}>
          <View style={styles.search}>
            <TextInput
              placeholder="Bạn muốn tìm gì?"
              placeholderTextColor="#C0C0C0"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(val) => textInputChange(val)}
            />
            <TouchableOpacity
              onPress={() => {
                if (dataSearch.textSearch.length > 0) {
                  navigation.navigate("productSearch", {
                    keyWord: dataSearch.textSearch,
                  });
                }
              }}
            >
              <View style={styles.iconSearch}>
                {/* <FontAwesome name="search" color="#05375a" size={30} /> */}
                <Feather name="search" color="#05375a" size={30} />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (account !== null) {
                navigation.navigate("cartScreen");
              } else {
                Alert.alert(
                  "Thông báo",
                  "Vui lòng đăng nhập",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        navigation.navigate("signInScreen"); // Chuyển đến trang đăng nhập
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }
            }}
            style={{
              flex: 1,
              height: 45,
              marginTop: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Feather name="shopping-cart" size={30} />
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
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 25,
            marginTop: 10,
          }}
        >
          <View style={{ flex: 3, alignItems: "flex-start" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Danh mục</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("categoryScreen");
            }}
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ fontSize: 15 }}>Tất cả</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
            zIndex: 2,
          }}
        >
          <FlatList
            data={mainGroupList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    getModelByMainGroupId(item.maingroupId, null, null, limitA);
                    setMainGroupIdSelect(item.maingroupId);
                  }}
                  key={index}
                  style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginTop: 5,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Image
                    source={{
                      uri: item.maingroupImagePath
                        ? item.maingroupImagePath
                        : "https://icon-library.com/images/image-icon-png/image-icon-png-6.jpg",
                    }}
                    // source={{
                    //   uri: item.maingroupImagePath,
                    // }}
                    style={{ width: 70, height: 70, borderRadius: 15 }}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginTop: 5,
                      width: 85,
                      display: "flex",
                      textAlign: "center",
                    }}
                  >
                    {item.maingroupName}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 4,
            paddingTop: 8,
          }}
        >
          {modelList && (
            <View
              style={{
                zIndex: 2,
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {modelList.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
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
                              {item.modelName.length > 30
                                ? `${item.modelName.slice(0, 30)}...`
                                : item.modelName}
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
                );
              })}
            </View>
          )}
        </View>
        {modelList != null && modelList.length > 20 && (
          <TouchableOpacity
            onPress={() => {
              limit = limitA + 10;
              setLimitA(limit);
              //console.log(limitA);
              getModelByMainGroupId(mainGroupIdSelect, null, null, limitA);
            }}
            style={{
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 5,
              marginBottom: 10,
              flexDirection: "row",
              marginHorizontal: 20,
              borderColor: "#aaaaaa",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#696969" }}>Xem thêm</Text>
            <Feather name="chevron-right" size={20} color="#696969" />
          </TouchableOpacity>
        )}
      </ScrollView>
      <Modal visible={visible} transparent={true}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ padding: 10, borderRadius: 5 }}>
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
  search: {
    marginTop: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: "row",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    flex: 7,
  },
  searchMargin: {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    color: "#05375a",
    fontSize: 18,
  },
  iconSearch: {
    marginRight: 15,
  },
});
