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
import Feather from "react-native-vector-icons/Feather";
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
import { createOrderAPI } from "../../helper/controller/order";
import ModalSelector from "react-native-modal-selector";
export default function Order({ navigation, route }) {
  let listItems = route.params.listItem;
  //console.log(listItems);
  let total = route.params.total;
  const [saleOrderId, setSaleOrderId] = useState(null);
  const [deliveryList, setDeliveryList] = useState([]);
  const [paymentOrderTypeList, setPaymentOrderTypeList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [feeDelivery, setFeeDelivery] = useState(0);
  const [feePromotion, setFeePromotion] = useState(0);
  const [orderNote, setOrderNote] = useState("");
  let newCartList = [];
  for (let i = 0; i < listItems.length; i++) {
    // discount += listItems[i].discountValue;
    //console.log(listItems[i].discountValue);
    //discount = discount + listItems.discountValue;
    let item = listItems[i];
    if (item.isRequestImei === 1 && item.quantity > 1) {
      for (let j = 0; j < item.quantity; j++) {
        let newItem = Object.assign({}, item);
        newItem.quantity = 1;
        newCartList.push(newItem);
      }
    } else {
      newCartList.push(item);
    }
  }
  let discount = 0;
  let totalPrice = 0;
  //console.log(listItems);
  listItems.forEach((item) => {
    discount += (item.price - item.discountValue) * item.quantity;
    totalPrice += item.price * item.quantity;
  });
  //console.log(discount);

  listItems = newCartList;
  const boxSize = calculateBoxSize(newCartList);
  //console.log(boxSize);

  function calculateBoxSize(subGroup) {
    // Tính tổng trọng lượng của tất cả sản phẩm
    let totalWeight = subGroup.reduce(
      (sum, item) => sum + item.weight * item.quantity,
      0
    );

    // Khởi tạo mảng phụ trợ để lưu trữ kết quả tạm thời trong quá trình tính toán
    let tempArr = new Array(totalWeight + 1);
    for (let i = 0; i <= totalWeight; i++) {
      tempArr[i] = new Array(subGroup.length + 1).fill(0);
    }

    // Tính toán kích thước hộp tối ưu
    let maxLength = 0;
    let maxWidth = 0;
    let totalHeight = 0;
    for (let i = 1; i <= subGroup.length; i++) {
      let item = subGroup[i - 1];
      for (let j = 1; j <= totalWeight; j++) {
        if (j >= item.weight) {
          let remainingWeight = j - item.weight;
          tempArr[j][i] = Math.max(
            tempArr[remainingWeight][i - 1] + item.length,
            tempArr[remainingWeight][i - 1] + item.width,
            tempArr[remainingWeight][i - 1] + item.height,
            tempArr[j][i - 1]
          );
        } else {
          tempArr[j][i] = tempArr[j][i - 1];
        }
        if (tempArr[j][i] > maxLength && tempArr[j][i] <= 200) {
          maxLength = tempArr[j][i];
        }
        if (
          tempArr[j][i] > maxWidth &&
          tempArr[j][i] > maxLength &&
          tempArr[j][i] <= 200
        ) {
          maxWidth = tempArr[j][i];
        }
      }
    }

    totalHeight = subGroup.reduce((sum, item) => sum + item.height, 0);

    // Thêm khoảng trống vào kích thước hộp để đảm bảo an toàn cho sản phẩm trong quá trình vận chuyển
    let extraSpace = 10;
    maxLength += extraSpace;
    maxWidth += extraSpace;
    totalHeight += extraSpace;

    return {
      maxLength,
      maxWidth,
      totalHeight,
      totalWeight,
    };
  }

  const cartItemList = [1, 2, 3, 4, 5];
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();
  const [account, setAccount] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState({});
  const [selectedDelivery, setSelectedDelivery] = useState({});
  const [selectedPaymentOrderType, setSelectedPaymentOrderType] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});
  const [accountInfo, setAccountInfo] = useState({});
  //console.log(selectedAddress);

  const textInputChangeOrderNote = (val) => {
    setOrderNote(val);
  };
  const getAccount = async () => {
    const accountFromStorage = await AsyncStorage.getItem("account");
    setAccount(JSON.parse(accountFromStorage));
    getAddress(JSON.parse(accountFromStorage));
    getAccountInfo(JSON.parse(accountFromStorage));
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
  const getAddress = async (account) => {
    const result = await getAllAddressByCustomerId(account);
    if (result.status === 200) {
      setAddressList(result.data.data.customerAddress);
      const address = result.data.data.customerAddress;
      address.forEach((item) => {
        if (item.isDefaultAddress === 1) {
          //setDefaultAddress(item);
          setSelectedAddress(item);
          getDeleveryFee(
            item.districtId,
            item.wardId,
            boxSize.totalHeight,
            boxSize.maxLength,
            boxSize.totalWeight,
            boxSize.maxWidth
          );
        }
      });
    }
  };
  const getDelivery = async () => {
    const result = await getAllDelivery();
    if (result.status === 200) {
      setDeliveryList(result.data.data.deliveryTypes);
    }
  };
  const getPaymentOrderType = async () => {
    const result = await getAllPaymentOrderType();
    if (result.status === 200) {
      setPaymentOrderTypeList(result.data.data.paymentOrderType);
      setSelectedPaymentOrderType(result.data.data.paymentOrderType[0]);
    }
  };

  const getDeleveryFee = async (
    to_district_id,
    to_ward_code,
    height,
    length,
    weight,
    width
  ) => {
    //console.log(to_district_id, to_ward_code, height, length, weight, width);
    const result = await getDeliveryFeeAPI(
      to_district_id,
      to_ward_code,
      height,
      length,
      weight,
      width
    );
    //console.log(result.data);

    if (result.status === 200) {
      setFeeDelivery(result.data.data.total);
    }
  };

  const handleSelectedAddress = (option) => {
    setSelectedAddress({
      contactName: option.contactName,
      contactPhoneNumber: option.contactPhoneNumber,
      provinceId: option.provinceId,
      provinceName: option.provinceName,
      districtId: option.districtId,
      districtName: option.districtName,
      wardId: option.wardId,
      wardName: option.wardName,
      address: option.address,
    });
    getDeleveryFee(
      option.districtId,
      option.wardId,
      boxSize.totalHeight,
      boxSize.maxLength,
      boxSize.totalWeight,
      boxSize.maxWidth
    );
  };

  // const getService = async (to_district) => {
  //   console.log(to_district);
  //   const result = await getServiceAPI(to_district);
  //   if (result.status === 200) {
  //     //console.log(result.data);
  //   }
  // };

  const handleSelectedPaymentOrderType = (option) => {
    setSelectedPaymentOrderType({
      paymentOrderTypeId: option.paymentOrderTypeId,
      paymentOrderTypeName: option.paymentOrderTypeName,
      isOrderToPay: option.partnerServiceCode,
    });
  };
  let totalPayment = 0;
  totalPayment = totalPayment + total + feeDelivery;
  //console.log(totalPayment, total, feeDelivery, discount);

  const handleBuyer = async () => {
    //navigation.navigate("cartScreen");
    setVisible(true);
    const saleOrder = {};
    saleOrder.saleOrderTypeId = 1;
    saleOrder.deliveryTypeId = 1;
    saleOrder.customerId = account;
    saleOrder.customerName = accountInfo.firstname + accountInfo.lastname;
    saleOrder.customerGender = accountInfo.gender;
    saleOrder.customerPhone = accountInfo.phoneNumber;
    saleOrder.contactName = selectedAddress.contactName;
    saleOrder.contactGender = accountInfo.gender;
    saleOrder.contactPhone = selectedAddress.contactPhoneNumber;
    saleOrder.contactFullAddress =
      selectedAddress.wardName +
      ", " +
      selectedAddress.districtName +
      ", " +
      selectedAddress.provinceName;
    saleOrder.contactAddress = selectedAddress.address;
    saleOrder.contactProvinceId = selectedAddress.provinceId;
    saleOrder.contactDistrictId = selectedAddress.districtId;
    saleOrder.contactWardId = selectedAddress.wardId;
    saleOrder.customerFullAddress =
      accountInfo.wardName +
      ", " +
      accountInfo.districtName +
      ", " +
      accountInfo.provinceName;
    saleOrder.customerAddress = accountInfo.address;
    saleOrder.customerProvinceId = accountInfo.provinceId;
    saleOrder.customerDistrictId = accountInfo.districtId;
    saleOrder.customerWardId = accountInfo.wardId;
    saleOrder.paymentOrderTypeId = selectedPaymentOrderType.paymentOrderTypeId;
    saleOrder.deliveryAddress = selectedAddress.address;
    saleOrder.deliveryProvinceId = selectedAddress.provinceId;
    saleOrder.deliveryDistrictd = selectedAddress.districtId;
    saleOrder.deliveryWardId = selectedAddress.wardId;
    saleOrder.outputStoreId = 1;
    saleOrder.totalPaid = 0;
    saleOrder.shippingCost = feeDelivery;
    saleOrder.totalMoney = total;
    saleOrder.debt = totalPayment;
    saleOrder.note = orderNote;
    saleOrder.createdApp = account;
    //console.log(saleOrder);
    //console.log(listItems);
    let saleOrderDetail = [];
    listItems.forEach((item) => {
      saleOrderDetail.push({
        cartcustomerId: item.cartcustomerId,
        subgroupId: item.subgroupId,
        modelId: item.modelId,
        productId: item.productId,
        inventoryStatusId: 1,
        IMEI: "",
        quantity: item.quantity,
        salePriceVAT: item.price,
        VAT: 10,
        insuranceFee: 0,
        promotionId: item.promotionProgramId,
        promotionDiscount: 0,
        promotionRootSaleOrderDetailId: null,
        outputTypeId: 1,
        importInputVoucher: null,
        note: "",
      });
    });
    // console.log(saleOrderDetail);

    const result = await createOrderAPI(account, saleOrder, saleOrderDetail);
    //console.log(saleOrderDetail);
    if (result.status === 200) {
      if (result.data.isError === true) {
        setVisible(false);
        Alert.alert("Thông báo", "Đặt hàng thất bại");
      } else {
        setSaleOrderId(result.data.data.saleOrder.saleOrderId);
        //console.log(result.data.data.saleOrder.saleOrderId);
        setVisible(false);
        navigation.navigate("completedOrder", {
          saleOrder: result.data.data.saleOrder,
        });
      }
    } else {
      setVisible(false);
      Alert.alert("Thông báo", "Có lỗi khi tạo đơn");
    }
  };

  useEffect(() => {
    getAccount();
    getDelivery();
    getPaymentOrderType();
    // to_district_id,
    //   to_ward_code,
    //   height,
    //   length,
    //   weight,
    //   width
  }, []);
  return (
    <View style={{ height: "98%" }}>
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
        <Text style={styles.returnText}>Đơn hàng</Text>
      </View>
      <ScrollView style={{ marginBottom: 65 }}>
        {defaultAddress && (
          <View
            style={{
              paddingLeft: 12,
              paddingTop: 12,
              paddingBottom: 12,
              backgroundColor: "#ffffff",
            }}
          >
            <View>
              <ModalSelector
                data={addressList}
                // defaultValue={acountInfo.provinceId}
                onChange={handleSelectedAddress}
                keyExtractor={(item) => item.customerAddressId.toString()}
                labelExtractor={(item) => (
                  <View>
                    <Text>
                      {item.contactName + " - " + item.contactPhoneNumber}
                    </Text>
                    <Text>
                      {item.address +
                        ", " +
                        item.wardName +
                        ", " +
                        item.districtName +
                        ", " +
                        item.provinceName}
                    </Text>
                  </View>
                )}
                optionContainerStyle={{
                  maxHeight: "60%",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 4,
                    borderColor: "#777777",
                  }}
                >
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <Ionicons name="location-outline" size={20} />
                    <Text
                      style={{
                        marginLeft: 4,
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Địa chỉ nhận hàng
                    </Text>
                  </View>
                  <View style={{ paddingLeft: 24 }}>
                    <Text>
                      {selectedAddress.contactName +
                        " - " +
                        selectedAddress.contactPhoneNumber}
                    </Text>

                    <Text style={{ width: "95%" }}>
                      {selectedAddress.address +
                        ", " +
                        selectedAddress.wardName +
                        "," +
                        selectedAddress.districtName +
                        ", " +
                        selectedAddress.provinceName}
                    </Text>
                  </View>
                </View>
              </ModalSelector>
            </View>
          </View>
        )}
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
            {listItems.map((item, index) => (
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
                            {"đ" + item.price.toLocaleString()}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              color: "#FF0000",
                              padding: 2,
                            }}
                          >
                            {"đ" + item.discountValue.toLocaleString()}
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
              {total.toLocaleString() + "đ"}
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
            <Text style={{ fontWeight: "bold" }}>Ghi chú đơn hàng</Text>
          </View>
          <View
            style={{
              marginTop: 1,
              paddingHorizontal: 15,
              backgroundColor: "#ffffff",
              minHeight: 100,
            }}
          >
            <TextInput
              placeholder="Nhập ghi chú (Nếu có)"
              multiline
              placeholderTextColor="#C0C0C0"
              autoCapitalize="none"
              style={{
                backgroundColor: "#ffffff",
                maxHeight: 400,
                minHeight: 80,
                borderRadius: 4,
                borderColor: "#777777",
              }}
              onChangeText={(val) => textInputChangeOrderNote(val)}
            />
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
            <Text style={{ fontSize: 13, paddingLeft: 4 }}>(Nhấn để chọn)</Text>
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
            <View>
              <ModalSelector
                data={paymentOrderTypeList}
                // defaultValue={acountInfo.provinceId}
                onChange={handleSelectedPaymentOrderType}
                keyExtractor={(item) => item.paymentOrderTypeId.toString()}
                labelExtractor={(item) => item.paymentOrderTypeName}
                optionContainerStyle={{
                  maxHeight: "60%",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 4,

                    borderColor: "#777777",
                  }}
                >
                  <Text
                    style={{
                      height: 50,
                      paddingHorizontal: 10,
                      borderRadius: 4,
                      lineHeight: 50,
                      width: 280,
                    }}
                  >
                    {selectedPaymentOrderType.paymentOrderTypeName
                      ? selectedPaymentOrderType.paymentOrderTypeName
                      : "--Chọn hình thức thanh toán--"}
                  </Text>
                </View>
              </ModalSelector>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather name="chevron-right" size={20} />
            </View>
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
            <View
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
                {totalPrice.toLocaleString() + "đ"}
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
            </View>
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
                {total.toLocaleString() + "đ"}
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
                {feeDelivery.toLocaleString() + "đ"}
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
                {totalPayment.toLocaleString() + "đ"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <View
          style={{
            backgroundColor: "#ffffff",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 16, textAlign: "right" }}>
                Tổng tiền thanh toán
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#ff0000",
                  textAlign: "right",
                }}
              >
                {totalPayment.toLocaleString() + "đ"}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingLeft: 20,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => handleBuyer()}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 20,
                paddingHorizontal: 40,
                backgroundColor: "#CC0000",
              }}
            >
              <Text style={{ fontSize: 16, color: "#ffffff" }}>Mua hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
