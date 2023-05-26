import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { Card } from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  getAllAddressByCustomerId,
  deleteAddress,
} from "../../helper/controller/address";
export default function Address({ navigation, route }) {
  let account = route.params.account;
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  //console.log(account);
  const [addressList, setAddressList] = useState([]);
  //console.log(addressList);
  const getAllAddress = async (customerId) => {
    setVisible(true);
    const result = await getAllAddressByCustomerId(customerId);
    if (result.status === 200) {
      setVisible(false);
      setAddressList(result.data.data.customerAddress);
    }
  };
  const renderRightActions = (customerAddressId) => {
    const deleteItem = async (customerAddressId) => {
      // console.log(customerAddressId);
      const result = await deleteAddress(account, customerAddressId);
      if (result.status === 200) {
        getAllAddress(account);
      }
    };
    return (
      <TouchableOpacity
        onPress={() => deleteItem(customerAddressId)}
        style={{
          justifyContent: "center",
          alignItems: "flex-end",
          paddingRight: 16,
          paddingLeft: 8,
          zIndex: 6,
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
  useEffect(() => {
    getAllAddress(account);
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
        <Text style={styles.returnText}>Địa chỉ</Text>
      </View>
      <View style={{ height: "90%" }}>
        <FlatList
          data={addressList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <Swipeable
                renderRightActions={() =>
                  renderRightActions(item.customerAddressId)
                }
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("updateAddress", {
                      account: account,
                      addressInfo: item,
                    });
                  }}
                  key={index}
                  style={{
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 8,
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    backgroundColor: "#ffffff",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingBottom: 12,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      {"Địa chỉ " + (index + 1)}
                    </Text>
                    <View>
                      {item.isDefaultAddress ? (
                        <Text
                          style={{
                            color: "#ff0000",
                            borderWidth: 1,
                            borderColor: "#ff0000",
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                          }}
                        >
                          Mặc định
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  <View style={{ paddingBottom: 4 }}>
                    {item.contactName && (
                      <Text style={{ fontSize: 15, color: "#666666" }}>
                        {item.contactName + " | | " + item.contactPhoneNumber}
                      </Text>
                    )}
                  </View>
                  <View>
                    {item.address && (
                      <Text style={{ fontSize: 15, color: "#666666" }}>
                        {item.address}
                      </Text>
                    )}
                  </View>
                  <View>
                    <Text style={{ fontSize: 15, color: "#666666" }}>
                      {item.wardName +
                        ", " +
                        item.districtName +
                        ", " +
                        item.provinceName}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            );
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          marginHorizontal: 50,
          marginVertical: 70,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("addNewAddress", { account: account });
          }}
          style={{
            padding: 12,
            borderRadius: 50,
            backgroundColor: "#ff0000",
          }}
        >
          <Entypo name="plus" size={40} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <Modal visible={visible} transparent={true}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "#EEEEEE",
              padding: 10,
              borderRadius: 5,
            }}
            transparent="30%"
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
