import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import { getModelByMainGroup } from "../../helper/controller/shop";
import {
  getSuggestBySubgroupList,
  getCartItemsAPI,
} from "../../helper/controller/cart";
import { getAllAddressByCustomerId } from "../../helper/controller/address";
import { useIsFocused } from "@react-navigation/native";
import NumericInput from "react-native-numeric-input";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox, Icon, Card } from "react-native-elements";
import { getAllDelivery } from "../../helper/controller/deliveryType";
import { getAllPaymentOrderType } from "../../helper/controller/paymentOrderType";
import { getDeliveryFeeAPI, getServiceAPI } from "../../helper/controller/GHN";
import { getAccountInfoAPI } from "../../helper/controller/profile";
import {
  createOrderAPI,
  getOrderDetailAPI,
} from "../../helper/controller/order";
import ModalSelector from "react-native-modal-selector";
export default function OrderDetail({ navigation, route }) {
  let items = route.params.items;
  let isCompletedOrder = route.params.isCompletedOrder || false;
  //console.log(items);
  const cartItemList = [1, 2, 3, 4, 5];
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();
  const [account, setAccount] = useState(null);
  const [saleOrderDetail, setSaleOrderDetail] = useState({});
  const [saleOrderDetailList, setSaleOrderDetailList] = useState([]);
  const [totalMoney, setTotalMoney] = useState({
    totalMoney: 0,
    shippingCost: 0,
    totalPaid: 0,
    debt: 0,
  });
  const getAccount = async () => {
    const accountFromStorage = await AsyncStorage.getItem("account");
    setAccount(JSON.parse(accountFromStorage));
  };
  const getOrderDetail = async (items) => {
    const result = await getOrderDetailAPI(items);
    if (result.status === 200) {
      setSaleOrderDetail(result.data.data.saleOrder);
      setSaleOrderDetailList(result.data.data.saleOrder.saleOrderDetails);
      setTotalMoney({
        totalMoney: result.data.data.saleOrder.totalMoney,
        shippingCost: result.data.data.saleOrder.shippingCost,
        totalPaid: result.data.data.saleOrder.totalPaid,
        debt: result.data.data.saleOrder.debt,
      });
    }
  };
  let statusText = "";
  if (
    saleOrderDetail.isReviewed === 0 &&
    saleOrderDetail.isOutput === 0 &&
    saleOrderDetail.isDelivery === 0 &&
    saleOrderDetail.isIncome === 0 &&
    saleOrderDetail.isDeleted === 0
  ) {
    statusText = "Chờ xác nhận đơn";
  } else if (
    saleOrderDetail.isReviewed === 1 &&
    saleOrderDetail.isOutput === 0 &&
    saleOrderDetail.isDelivery === 0 &&
    saleOrderDetail.isIncome === 0 &&
    saleOrderDetail.isDeleted === 0
  ) {
    statusText = "Chờ lấy hàng";
  } else if (
    saleOrderDetail.isReviewed === 1 &&
    saleOrderDetail.isOutput === 1 &&
    saleOrderDetail.isDelivery === 0 &&
    saleOrderDetail.isIncome === 0 &&
    saleOrderDetail.isDeleted === 0
  ) {
    statusText = "Đang giao hàng";
  } else if (
    saleOrderDetail.isReviewed === 1 &&
    saleOrderDetail.isOutput === 1 &&
    saleOrderDetail.isDelivery === 1 &&
    saleOrderDetail.isIncome === 0 &&
    saleOrderDetail.isDeleted === 0
  ) {
    statusText = "Đã hoàn tất";
  } else if (saleOrderDetail.isDeleted === 1) {
    statusText = "Đã huỷ đơn";
  }

  useEffect(() => {
    getAccount();
    getOrderDetail(items);
  }, [isFocused]);
  return (
    <View style={{ height: "100%" }}>
      <View style={styles.return}>
        <View style={styles.returnIcon}>
          <TouchableOpacity
            onPress={() => {
              if (isCompletedOrder === true) {
                navigation.navigate("dashboardScreen");
              } else {
                navigation.goBack();
              }
            }}
          >
            <FontAwesome name="arrow-left" color="#ffffff" size={20} />
          </TouchableOpacity>
        </View>
        <Text style={styles.returnText}>Chi tiết đơn hàng</Text>
      </View>
      <ScrollView style={{ marginBottom: 8 }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#aaaaaa",
            flexDirection: "row",
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 20,
                color: "#ffffff",
              }}
            >
              {statusText + "!"}
            </Text>
            <Text
              style={{
                color: "#ffffff",
              }}
            >
              {"Ngày mua: " +
                new Date(saleOrderDetail.createdDate).toLocaleDateString()}
            </Text>
          </View>
          <FontAwesome name="opencart" size={36} color="#ffffff" />
        </View>
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 4,
            borderColor: "#777777",
            paddingLeft: 8,
            paddingTop: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Ionicons name="location-outline" size={20} />
            <Text
              style={{
                marginLeft: 4,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Thông tin nhận hàng
            </Text>
          </View>
          <View style={{ paddingLeft: 24, paddingBottom: 12 }}>
            <Text>
              {saleOrderDetail.customerName
                ? saleOrderDetail.customerName
                : "Anh/Chị - Khách - " + "-" + items.customerPhone}
            </Text>
            <Text>
              {saleOrderDetail.customerAddress +
                ", " +
                saleOrderDetail.customerFullAddress}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 4 }}>
          <View
            style={{
              backgroundColor: "#ffffff",
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Sản phẩm</Text>
          </View>
          <View style={{ backgroundColor: "#ffffff", paddingBottom: 4 }}>
            {saleOrderDetailList.map((item, index) => (
              <View key={index}>
                <View style={{ marginTop: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: 16,
                      backgroundColor: "#eeeeee",
                      paddingLeft: 20,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 5,
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
                            borderRadius: 15,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          paddingLeft: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            padding: 2,
                          }}
                        >
                          {item.modelName}
                        </Text>
                        {item.productName && (
                          <Text
                            style={{
                              fontSize: 14,
                              paddingBottom: 4,
                            }}
                          >
                            {item.productName}
                          </Text>
                        )}
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "flex-end",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 13,
                              color: "#000000",
                              padding: 2,
                              textDecorationLine: "line-through",
                            }}
                          >
                            {item.salePriceVAT.toLocaleString()}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              color: "#FF0000",
                              padding: 2,
                            }}
                          >
                            {saleOrderDetail.totalMoney.toLocaleString()}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        paddingLeft: 12,
                        paddingRight: 20,
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>
                        {"x" + item.quantity}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View
            style={{
              backgroundColor: "#ffffff",
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginBottom: 1,
              marginTop: 4,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Tổng tiền</Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                color: "#ff0000",
                paddingRight: 8,
              }}
            >
              {totalMoney.totalMoney.toLocaleString() + "đ"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#ffffff",
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginBottom: 1,
              marginTop: 4,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              Ghi chú đơn hàng (Nếu có)
            </Text>
          </View>
          <View
            style={{
              marginTop: 1,
              paddingHorizontal: 15,
              backgroundColor: "#ffffff",
              minHeight: 50,
            }}
          >
            <Text style={{ paddingTop: 8 }}>{saleOrderDetail.note}</Text>
          </View>
          <View
            style={{
              backgroundColor: "#ffffff",
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginBottom: 1,
              marginTop: 4,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Hình thức thanh toán</Text>
          </View>
          <View
            onPress={() => {}}
            style={{
              marginTop: 1,
              backgroundColor: "#ffffff",
              paddingHorizontal: 15,
              paddingVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Thanh toán COD</Text>
          </View>
          <View
            style={{
              backgroundColor: "#ffffff",
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginBottom: 1,
              marginTop: 4,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Chi tiết thanh toán</Text>
          </View>
          <View
            style={{
              marginTop: 1,
              backgroundColor: "#ffffff",
              paddingHorizontal: 15,
              paddingVertical: 20,
            }}
          >
            {/* <View
              style={{
                paddingVertical: 5,
                fontSize: 16,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Tổng tiền hàng</Text>
              <Text
                style={{
                  paddingRight: 8,
                  fontWeight: "bold",
                  color: "#ff0000",
                }}
              >
                {totalMoney.totalMoney.toLocaleString()}
              </Text>
            </View> */}

            {/* <View
              style={{
                paddingVertical: 5,
                fontSize: 16,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Khuyến mãi (Nếu có)</Text>
              <Text
                style={{
                  paddingRight: 8,
                  fontWeight: "bold",
                  color: "#ff0000",
                }}
              >
                {"-" + discount.toLocaleString() + "đ"}
              </Text>
            </View> */}
            <View
              style={{
                paddingVertical: 5,
                fontSize: 16,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Tổng tiền hàng (Đã giảm)</Text>
              <Text
                style={{
                  paddingRight: 8,
                  fontWeight: "bold",
                  color: "#ff0000",
                }}
              >
                {totalMoney.totalMoney.toLocaleString()}
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 5,
                fontSize: 16,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Phí giao hàng</Text>
              <Text
                style={{
                  paddingRight: 8,
                  fontWeight: "bold",
                  color: "#ff0000",
                }}
              >
                {totalMoney.shippingCost.toLocaleString()}
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 17 }}>Tổng thanh toán</Text>
              <Text
                style={{
                  paddingRight: 8,
                  fontWeight: "bold",
                  color: "#ff0000",
                  fontSize: 17,
                }}
              >
                {totalMoney.debt.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={visible} transparent={true}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ padding: 10, borderRadius: 5 }}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 10 }}>Loading...</Text>
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
