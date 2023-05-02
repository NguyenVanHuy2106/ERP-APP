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
  ActivityIndicator,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getModelByMainGroup } from "../../helper/controller/shop";
import { useIsFocused } from "@react-navigation/native";
import NumericInput from "react-native-numeric-input";
import Swipeable from "react-native-gesture-handler/Swipeable";
export default function Cart({ navigation }) {
  const [cartItemList, setCartItemList] = useState([]);
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (value) => {
    setQuantity(value);
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
      setCartItemList(result.data.data.modelList);
      setVisible(false);
    } else {
      Alert.alert("Thông báo", "Lỗi lấy dữ liệu");
    }
  };
  useEffect(() => {
    getModelByMainGroupId(2, 2, null, 20);
  }, []);
  const renderRightActions = (modelId) => {
    const deleteItem = (modelId) => {
      console.log(modelId);
    };
    return (
      <TouchableOpacity
        onPress={() => deleteItem(modelId)}
        style={{
          justifyContent: "center",
          alignItems: "flex-end",
          paddingRight: 4,
          paddingLeft: 16,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ff0000",
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
        <Text style={styles.returnText}>Giỏ hàng</Text>
      </View>
      <View style={{ height: "92%" }}>
        <FlatList
          data={cartItemList}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={{ marginTop: 8, marginLeft: 12, marginRight: 12 }}>
              <Swipeable
                renderRightActions={() => renderRightActions(item.modelId)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    padding: 16,
                    backgroundColor: "#ffffff",
                    borderRadius: 16,
                  }}
                >
                  <View>
                    <Image
                      source={{
                        uri: item.modelImagePath
                          ? item.modelImagePath
                          : "https://icon-library.com/images/image-icon-png/image-icon-png-6.jpg",
                      }}
                      style={{ width: 90, height: 90, borderRadius: 15 }}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      paddingLeft: 12,
                    }}
                  >
                    <Text
                      style={{ fontSize: 16, fontWeight: "bold", padding: 5 }}
                    >
                      {item.modelName}
                    </Text>
                    <Text
                      style={{ fontSize: 16, color: "#FF0000", padding: 5 }}
                    >
                      {"đ" + item.modelPrice.toLocaleString()}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-end",
                      paddingLeft: 12,
                    }}
                  >
                    <NumericInput
                      value={quantity}
                      onChange={handleQuantityChange}
                      totalWidth={85}
                      totalHeight={30}
                      minValue={0}
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
              </Swipeable>
            </View>
          )}
        />
      </View>
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
            marginBottom: 30,
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
                đ10.000.000
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
              onPress={() => {}}
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
          <View
            style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}
          >
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
