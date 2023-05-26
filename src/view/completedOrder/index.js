import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  //Modal,
  ActivityIndicator,
  Alert,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
  Chip,
} from "react-native-paper";
import { Card } from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import NumericInput from "react-native-numeric-input";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-swiper";
import { getModelInfoAPI } from "../../helper/controller/shop";
import { addToCart } from "../../helper/controller/cart";
import {
  getModelByMainGroup,
  getProductIdByVarrant,
} from "../../helper/controller/shop";
import { updateModelFav } from "../../helper/controller/customerFav";
import Modal from "react-native-modal";
// import { ScrollView } from "react-native-gesture-handler";
export default function CompletedOrder({ navigation, route }) {
  const [account, setAccount] = useState(null);
  let saleOrder = route.params.saleOrder;
  //   let saleOrderId = route.params.saleOrderId;
  //   let saleOrderDetail = route.params.saleOrderDetail;
  //   let saleOrder = {
  //     saleOrderTypeId: 1,
  //     deliveryTypeId: 1,
  //     customerId: 1,
  //     customerName: "Trần Gia Phúc",
  //     customerGender: 1,
  //     customerPhone: "0376610570",
  //     contactName: "Trần Gia Phúc",
  //     contactGender: 1,
  //     contactPhone: "0376610570",
  //     contactFullAddress:
  //       "402, ấp 4, PL, GT, BT 402, ấp 4, PL, GT, BT 402, ấp 4, PL, GT, BT",
  //     contactAddress: "402, ấp 4",
  //     contactProvinceId: 1,
  //     contactDistrictId: 1,
  //     contactWardId: 1,
  //     customerFullAddress: "402, ấp 4, PL, GT, BT",
  //     customerAddress: "402, ấp 4",
  //     customerProvinceId: 1,
  //     customerDistrictId: 1,
  //     customerWardId: 1,
  //     paymentOrderTypeId: 1,
  //     deliveryAddress: "402, ấp 4",
  //     deliveryProvinceId: 1,
  //     deliveryDistrictId: 1,
  //     deliveryWardId: 1,
  //     outputStoreId: 1,
  //     totalPaid: 0,
  //     shippingCost: 10000,
  //     totalMoney: 10000000,
  //     debt: 10010000,
  //     note: "requestSaleorder.note",
  //     createdApp: 1,
  //   };
  //   let saleOrderDetail = [
  //     {
  //       cartcustomerId: 1,
  //       subgroupId: 6,
  //       modelId: 51,
  //       productId: "00070006000002000461",
  //       inventoryStatusId: 1,
  //       IMEI: "12763123126",
  //       quantity: 1,
  //       salePriceVAT: 850000,
  //       VAT: 10,
  //       insuranceFee: 0,
  //       promotionProgramId: null,
  //       promotionDiscount: 0,
  //       promotionRootSaleOrderDetailId: null,
  //       outputTypeId: 1,
  //       importInputVoucher: null,
  //       note: "saleOrderDetail.note",
  //     },
  //   ];
  const [visible, setVisible] = useState(false);

  const getAccount = async () => {
    const accountFromStorage = await AsyncStorage.getItem("account");
    setAccount(JSON.parse(accountFromStorage));
  };

  useEffect(() => {
    //setTime();
    getAccount();
  }, []);

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
        <Text style={styles.returnText}>Chi tiết</Text>
      </View>
      <ScrollView style={{ height: "100%" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
          }}
        >
          <View
            style={{
              borderRadius: 100,
              padding: 10,
            }}
          >
            <MaterialCommunityIcons
              name="basket-check"
              size={140}
              color="#FF0800"
            />
          </View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "#FF0800",
            }}
          >
            Đặt hàng thành công
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 30,
              paddingVertical: 10,
              borderColor: "#FF0800",
            }}
          >
            <Text
              style={{
                color: "#FF0800",
                fontSize: 16,
              }}
            >
              Tiếp tục mua sắm
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("orderDetail", {
                items: saleOrder,
                isCompletedOrder: true,
              });
            }}
            style={{
              borderWidth: 1,
              paddingHorizontal: 30,
              paddingVertical: 10,
              borderColor: "#FF0800",
            }}
          >
            <Text
              style={{
                color: "#FF0800",
                fontSize: 16,
              }}
            >
              Chi tiết đơn hàng
            </Text>
          </TouchableOpacity>
        </View>
        <Card
          containerStyle={{
            borderRadius: 5,
            marginTop: 20,
            borderWidth: 0,
            shadowColor: "#696969",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.6,
            shadowRadius: 2,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                paddingVertical: 5,
                paddingHorizontal: 5,
              }}
            >
              Thông tin đặt hàng
            </Text>
          </View>
          <View
            style={{
              padding: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Mã đơn hàng</Text>
            <Text>{saleOrder.saleOrderId}</Text>
          </View>
          <View
            style={{
              padding: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Người nhận</Text>
            <Text>{saleOrder.contactName}</Text>
          </View>
          <View
            style={{
              padding: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Số điện thoại</Text>
            <Text>{saleOrder.contactPhone}</Text>
          </View>
          <View
            style={{
              padding: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Địa chỉ</Text>
            <Text
              style={{
                textAlign: "right",
                width: "70%",
              }}
            >
              {saleOrder.contactFullAddress}
            </Text>
          </View>
          <View
            style={{
              padding: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Tổng tiền</Text>
            <Text
              style={{
                textAlign: "right",
                width: "80%",
              }}
            >
              {saleOrder.debt.toLocaleString()}
            </Text>
          </View>
          <View
            style={{
              padding: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Ghi chú</Text>
            <Text
              style={{
                textAlign: "right",
                width: "70%",
              }}
            >
              {saleOrder.note}
            </Text>
          </View>
        </Card>
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

  /////Modal
  containerTitle: {
    height: 110,
    flexDirection: "row",
    borderRadius: 40,
    // backgroundColor: "#ffffff",
    // shadowColor: "#000000",
    // shadowOffset: { width: 5, height: 10 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    alignItems: "flex-end",
  },
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000000",
  },
  title: {
    marginLeft: 10,
    justifyContent: "center",

    marginBottom: 10,
  },
  caption: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 20,
    color: "#ffffff",
    marginTop: 10,
    marginBottom: 10,
  },
  captionTitle: {
    fontSize: 18,
    color: "#ffffff",
  },
  bordercaption: {
    marginTop: 30,
    //borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#666666",
  },
  containerButton: {
    marginTop: 40,
    marginLeft: 60,
    marginRight: 60,
    flexDirection: "row",
    height: 90,
  },
  containerFood: {
    flex: 1,
    alignItems: "center",
    //borderWidth: 1,
    marginRight: 7,
    borderRadius: 15,
    backgroundColor: "#FF4B3A",
    justifyContent: "center",
  },
  containerShop: {
    flex: 1,
    alignItems: "center",
    //borderWidth: 1,
    marginLeft: 20,
    borderRadius: 15,
    backgroundColor: "#FF4B3A",
    justifyContent: "center",
  },
  containerText: {
    flexDirection: "row",
    marginLeft: 50,
    marginRight: 50,
  },
  textCaption: {
    flex: 1,
    alignItems: "center",
  },
  textCaptionDetail: {
    fontWeight: "bold",
    color: "#FF0000",
    fontSize: 20,
    marginTop: 10,
  },
  addFavoriteFood: {
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 30,
    color: "#FF0000",
  },
  food: {
    width: 220,
    alignItems: "center",
  },
  textFood: {
    fontWeight: "bold",
    marginLeft: 70,
  },
  card: {
    marginLeft: 15,
    marginRight: 15,
  },
  cardFood: {
    marginBottom: 1,
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
  },
  searchMargin: {
    marginLeft: 15,
    marginRight: 15,
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
  /////////

  container: {
    marginTop: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomSheet: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  // handle: {
  //   backgroundColor: "gray",
  //   height: 6,
  //   width: 40,
  //   borderRadius: 3,
  //   alignSelf: "center",
  //   marginBottom: 8,
  // },
  paddingHandle: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    marginBottom: 40,
  },

  ///////
  containera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#FFF",
    height: 200,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  overlayWrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
