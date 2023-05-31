import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextStyle,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { getOrderList } from "../../../helper/controller/orderList";
export default function DoneOrders({ navigation, route }) {
  const [account, setAccount] = useState(null);
  const [confirmingList, setConfirmingList] = useState([]);

  const [visible, setVisible] = useState(false);
  //const [condition, setCondition] = useState({});
  let condition = {};
  //console.log(condition);
  const isFocused = useIsFocused();
  const getAccount = async () => {
    const accountFromStorage = await AsyncStorage.getItem("account");
    setAccount(JSON.parse(accountFromStorage));
    // setCondition({
    condition.saleOrderId = null;
    condition.isReviewed = 1;
    condition.isOutput = 1;
    condition.isDelivery = 1;
    condition.isIncome = null;
    condition.isDeleted = 0;
    condition.saleOrderTypeId = 1;
    condition.customerId = JSON.parse(accountFromStorage);
    condition.customerPhone = null;
    //console.log(condition);
    // });
    getOrderConfirmingList(JSON.parse(accountFromStorage), condition);
  };
  const getOrderConfirmingList = async (account, condition) => {
    setVisible(true);
    const result = await getOrderList(account, condition);
    if (result.status === 200) {
      setVisible(false);
      setConfirmingList(result.data.data.saleOrder);
      //console.log(result.data.data.saleOrder);
    }
    // console.log(account, condition);
    // console.log(result);
  };

  useEffect(() => {
    getAccount();
    //getOrderConfirmingList();
  }, [isFocused]);

  return (
    <View style={{ height: "100%" }}>
      {confirmingList && (
        <FlatList
          data={confirmingList}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("orderDetail", { items: item });
                }}
                key={index}
                style={{
                  backgroundColor: "#ffffff",
                  marginHorizontal: 12,
                  marginVertical: 6,
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    //paddingVertical: 4,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontStyle: "italic",
                        color: "#ff0000",
                        borderWidth: 1,
                        paddingHorizontal: 20,
                        paddingVertical: 6,
                        borderColor: "#ff0000",
                      }}
                    >
                      Hoàn tất
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    //paddingVertical: 4,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                >
                  <Text>Mã đơn hàng</Text>
                  <Text>{item.saleOrderId}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                >
                  <Text>Số điện thoại</Text>
                  <Text>{item.customerPhone}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                >
                  <Text>Người nhận</Text>
                  <Text>
                    {item.customerName === null
                      ? item.contactName
                      : item.customerName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                >
                  <Text>Địa chỉ</Text>
                  <Text
                    style={{
                      width: "70%",
                      textAlign: "right",
                    }}
                  >
                    {item.contactAddress + " " + item.contactFullAddress}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: "#EEEEEE",
                    paddingVertical: 1,
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: "row",
                    //justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                >
                  <View>
                    <Image
                      source={{
                        uri: item.modelImagePath
                          ? item.modelImagePath
                          : "https://icon-library.com/images/image-icon-png/image-icon-png-6.jpg",
                      }}
                      style={{
                        width: 90,
                        height: 90,
                        marginLeft: 0,
                        marginRight: 0,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        paddingLeft: 12,
                        paddingTop: 12,
                        width: "90%",
                        flexWrap: "wrap",
                      }}
                    >
                      {item.modelName ? item.modelName : ""}
                    </Text>
                    <Text style={{ paddingLeft: 12 }}>
                      {item.productName ? "Phân loại:" + item.productName : ""}
                    </Text>
                    <View
                      style={{
                        paddingLeft: 12,
                      }}
                    >
                      <Text>{"x" + item.quantity}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#EEEEEE",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <FontAwesome name="dollar" size={20} color="#ff0000" />
                  <Text style={{ color: "#ff0000", paddingLeft: 4 }}>
                    Thành tiền:{" "}
                  </Text>
                  <Text style={{ fontWeight: "bold", color: "#ff0000" }}>
                    {item.debt.toLocaleString() + "đ"}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
      <View>
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
    </View>
  );
}
