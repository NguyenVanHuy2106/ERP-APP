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
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getModelByMainGroup } from "../../helper/controller/shop";
import {
  getSuggestBySubgroupList,
  getCartItemsAPI,
  deleteCartItems,
} from "../../helper/controller/cart";
import { useIsFocused } from "@react-navigation/native";
import NumericInput from "react-native-numeric-input";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox, Icon, Card } from "react-native-elements";
import { value } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";
export default function Cart({ navigation }) {
  const [cartItemList, setCartItemList] = useState([]);
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();
  const [account, setAccount] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [quantityValue, setQuantityValue] = useState([]);
  const [suggestList, setSuggestList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const boxSize = {};

  let total = 0;
  //console.log(checkedItems);
  checkedItems.forEach((item) => {
    //console.log(item);
    total += item.quantity * item.discountValue;
  });

  var subGroupIdList = [];

  const handleCheck = (modelId, productId) => {
    if (modelId && productId) {
      const foundItemIndex = checkedItems.findIndex(
        (item) => item.modelId === modelId && item.productId === productId
      );
      if (foundItemIndex !== -1) {
        const updatedItems = [...checkedItems];
        updatedItems.splice(foundItemIndex, 1);
        setCheckedItems(updatedItems);
      } else {
        const cartItem = cartItemList.find(
          (item) => item.modelId === modelId && item.productId === productId
        );
        if (cartItem) {
          //console.log(cartItem);
          const newCheckedItem = {
            cartcustomerId: cartItem.cartcustomerId,
            subgroupId: cartItem.subgroupId,
            modelId: modelId,
            productId: productId,
            quantity:
              quantityValue[`${productId}_${modelId}`] ||
              cartItem.quantity > cartItem.availableInstockAmount
                ? cartItem.availableInstockAmount
                : cartItem.quantity,
            // quantity:
            //   cartItem.quantity > cartItem.availableInstockAmount
            //     ? cartItem.availableInstockAmount
            //     : quantityValue[`${productId}_${modelId}`] || cartItem.quantity,
            modelName: cartItem.modelName,
            productName: cartItem.productName,
            price: cartItem.price,
            modelImagePath: cartItem.modelImagePath,
            isRequestImei: cartItem.isRequestImei,
            width: parseInt(cartItem.width),
            length: parseInt(cartItem.length),
            height: parseInt(cartItem.height),
            weight: parseInt(cartItem.weight),
            discountValue: cartItem.discountValue,
            promotionProgramId: cartItem.promotionProgramId,
            promotionProgramName: cartItem.promotionProgramName,
          };
          setCheckedItems([...checkedItems, newCheckedItem]);
        }
      }
    }
  };

  const getCartItems = async (account) => {
    //console.log(account);
    setVisible(true);
    const result = await getCartItemsAPI(account);
    //console.log(result.data.data.cartList);
    if (result.status === 200) {
      setVisible(false);
      setCartItemList(result.data.data.cartList);
      var subGroup = result.data.data.cartList;
      //console.log(subGroup);
      subGroup.forEach((item) => {
        if (!subGroupIdList.includes(item.subgroupId)) {
          subGroupIdList.push(item.subgroupId);
        }
        //setTotalAmount(totalAmount + item.quantity * item.price);
        //totalMoney = totalMoney + item.quantity * item.price;
      });
      //getModelSuggest(subGroupIdList);

      //console.log(subGroupIdList);
      //setQuantity(result.data.data.cartList.quantity);
    } else {
      setVisible(false);
    }
  };

  const handleQuantityChange = (value, modelId, productId) => {
    const foundItemIndex = checkedItems.findIndex(
      (item) => item.modelId === modelId && item.productId === productId
    );
    const updatedQuantityValues = { ...quantityValue };
    updatedQuantityValues[`${productId}_${modelId}`] = value;
    //console.log(value);
    setQuantityValue(updatedQuantityValues);
    if (foundItemIndex !== -1) {
      const updatedItems = [...checkedItems];
      updatedItems[foundItemIndex].quantity = value;
      setCheckedItems(updatedItems);
    }
  };

  const getAccount = async () => {
    const accountFromStorage = await AsyncStorage.getItem("account");
    setAccount(JSON.parse(accountFromStorage));
    getCartItems(JSON.parse(accountFromStorage));
    getModelSuggest(JSON.parse(accountFromStorage));
  };
  const getModelSuggest = async (account) => {
    const result = await getSuggestBySubgroupList(account);
    if (result.status === 200) {
      setSuggestList(result.data.data.modelList);
    }
    //console.log(result.data);
  };
  const deleteCart = async (customerId, cartcustomerId, quantity) => {
    setVisible(true);
    const result = await deleteCartItems(customerId, cartcustomerId, quantity);
    if (result.status === 200) {
      setVisible(false);
      getCartItems(account);
    } else {
      setVisible(false);
    }
  };
  // const getTotalAmount = () => {
  //   let newTotalPrice = 0;
  //   checkedItems.forEach((item) => {
  //     const cartItem = cartItemList.find(
  //       (cartItem) =>
  //         cartItem.productId === item.productId &&
  //         cartItem.modelId === item.modelId
  //     );
  //     if (cartItem) {
  //       newTotalPrice += cartItem.price * item.quantity;
  //     }
  //   });
  //   setTotalAmount(newTotalPrice);
  // };
  useEffect(() => {
    //total = 0;
    //getModelByMainGroupId(6, null, null, 20);
    getAccount();
    setCheckedItems([]);
    setQuantityValue([]);
  }, [isFocused]);
  const renderRightActions = (item) => {
    const deleteItem = (item) => {
      //console.log(item);
      deleteCart(account, item.cartcustomerId, item.quantity);
    };
    return (
      <TouchableOpacity
        onPress={() => deleteItem(item)}
        style={{
          justifyContent: "center",
          alignItems: "flex-end",
          paddingRight: 4,
          paddingLeft: 4,
          backgroundColor: "#B22222",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#B22222",
            paddingHorizontal: 8,
            paddingVertical: 12,
            borderRadius: 10,
          }}
        >
          <FontAwesome name="trash-o" size={30} color="#ffffff" />
        </View>
      </TouchableOpacity>
    );
  };
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
        <Text style={styles.returnText}>Giỏ hàng</Text>
      </View>
      <ScrollView style={{ marginBottom: 65 }}>
        <View>
          {cartItemList.map((item, index) => (
            <View
              key={index}
              style={{
                marginTop: 8,
                paddingLeft: 12,
                marginRight: 12,
              }}
            >
              <Swipeable renderRightActions={() => renderRightActions(item)}>
                <TouchableOpacity
                  onPress={() => {
                    if (item.isAvailableToSale === true) {
                      navigation.navigate("shopDetailScreen", {
                        modelId: item.modelId,
                        modelPrice: item.modelPrice,
                        modelStockAmount: item.modelAvailableInstockAmount,
                      });
                    }
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: 16,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <CheckBox
                      key={index}
                      checked={checkedItems.some(
                        (itemA) =>
                          itemA.modelId === item.modelId &&
                          itemA.productId === item.productId
                      )}
                      disabled={!item.isAvailableToSale}
                      // checked={
                      //   item.availableInstockAmount > 0
                      //     ? checkedItems.some(
                      //         (itemA) =>
                      //           itemA.modelId === item.modelId &&
                      //           itemA.productId === item.productId
                      //       )
                      //     : false
                      // }
                      onPress={() => handleCheck(item.modelId, item.productId)}
                      size={30}
                      checkedColor="#ff0000"
                      containerStyle={{
                        padding: 0,
                        justifyContent: "center",
                        marginLeft: 16,
                      }}
                    />
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
                            paddingLeft: 4,
                            paddingTop: 2,
                          }}
                        >
                          {item.modelName}
                        </Text>
                        {item.productName ? (
                          <Text
                            style={{
                              fontSize: 14,
                              fontStyle: "italic",
                              paddingLeft: 4,
                            }}
                          >
                            {"Phân loại: " + item.productName}
                          </Text>
                        ) : null}
                        <Text
                          style={{
                            fontSize: 14,
                            fontStyle: "italic",
                            paddingLeft: 4,
                            paddingTop: 2,
                          }}
                        >
                          {"Còn: " + item.availableInstockAmount}
                        </Text>
                        <View>
                          {item.promotionProgramId !== null && (
                            <View
                              style={{
                                flexDirection: "row",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 13,
                                  color: "#000000",
                                  paddingTop: 4,
                                  paddingLeft: 4,
                                  textDecorationLine: "line-through",
                                }}
                              >
                                {"đ" + item.price.toLocaleString()}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: "#ff0000",
                                  paddingTop: 4,
                                  paddingLeft: 4,
                                  fontWeight: "bold",
                                }}
                              >
                                {item.isPercentValue === 1
                                  ? "-" + item.value + "%"
                                  : item.value + "đ"}
                              </Text>
                            </View>
                          )}
                          <Text
                            style={{
                              fontSize: 16,
                              color: "#FF0000",
                              paddingBottom: 4,
                              paddingLeft: 4,
                              paddingRight: 4,
                            }}
                          >
                            {item.discountValue === null
                              ? "Ngừng bán"
                              : "đ" + item.discountValue.toLocaleString()}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        paddingLeft: 12,
                        flex: 2,
                      }}
                    >
                      <NumericInput
                        value={
                          (quantityValue[`${item.productId}_${item.modelId}`] ||
                            item.quantity) > item.availableInstockAmount
                            ? item.availableInstockAmount
                            : quantityValue[
                                `${item.productId}_${item.modelId}`
                              ] || item.quantity
                        }
                        // value={
                        //   item.quantity > item.availableInstockAmount
                        //     ? item.availableInstockAmount
                        //     : quantityValue[
                        //         `${item.productId}_${item.modelId}`
                        //       ] || item.quantity
                        // }
                        onChange={(value) =>
                          handleQuantityChange(
                            value,
                            item.modelId,
                            item.productId
                          )
                        }
                        totalWidth={85}
                        totalHeight={30}
                        minValue={1}
                        maxValue={item.availableInstockAmount}
                        step={1}
                        valueType="real"
                        rounded
                        textColor="#000000"
                        iconStyle={{ color: "white" }}
                        rightButtonBackgroundColor="#CC0000"
                        leftButtonBackgroundColor="#CC0000"
                        containerStyle={{ borderWidth: 0.5 }}
                        inputStyle={{ fontSize: 14 }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            </View>
          ))}
        </View>
        <View>
          {suggestList && (
            <View
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#ffffff",
              }}
            >
              <View
                style={{
                  borderStyle: "dashed",
                  borderRadius: 1,
                  borderWidth: 1,
                  width: "100%",
                  alignSelf: "center",
                  borderColor: "#696969",
                }}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ color: "#696969" }}>Có thể bạn cũng thích</Text>
              </View>
              <View
                style={{
                  borderStyle: "dashed",
                  borderRadius: 1,
                  borderWidth: 1,
                  width: "100%",
                  alignSelf: "center",
                  borderColor: "#696969",
                }}
              />
            </View>
          )}
          {suggestList && (
            <View
              style={{
                zIndex: 2,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                marginTop: 5,
              }}
            >
              {suggestList.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("shopDetailScreen", {
                        modelId: item.modelId,
                        modelPrice: item.modelPrice,
                        discountValue: item.discountValue,
                        isPercentValue: item.isPercentValue,
                        value: item.value,
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
                Tổng tiền
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
                {total.toLocaleString()}
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
              onPress={() => {
                navigation.navigate("orderScreen", {
                  listItem: checkedItems,
                  total: total,
                });
                //console.log(checkedItems);
              }}
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
