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
} from "react-native";
import axios from "axios";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import ConfirmingOrders from "./confirmingOrders";
import DeliveryOrders from "./deliveryOrders";
import CanceledOrders from "./canceledOrders";
import WaitGetProductOrder from "./waitGetProductOrder";
import DoneOrders from "./doneOrders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

export default function OrderedList({ navigation, route }) {
  // console.log(orders);

  //const orderStatus = ['Chờ duyệt', 'Đang giao', 'Đã giao', 'Hủy đơn']
  const [account, setAccount] = useState(null);
  //console.log(account);

  const getAccount = async () => {
    const accountFromStorage = await AsyncStorage.getItem("account");
    setAccount(JSON.parse(accountFromStorage));
  };

  useEffect(() => {
    getAccount();
  }, []);
  return (
    <View style={styles.container}>
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
        <Text style={styles.returnText}>Quản lý đơn hàng</Text>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarStyle: { height: 50, justifyContent: "center" },
        }}
      >
        <Tab.Screen
          name="Chờ xác nhận"
          component={ConfirmingOrders}
          initialParams={{ account }}
          options={{
            headerShown: false,
            tabBarItemStyle: { width: 130 },
          }}
        />
        <Tab.Screen
          name="Chờ lấy hàng"
          component={WaitGetProductOrder}
          //initialParams={{ ConfirmingOrders, userData, userInfo }}
          options={{
            headerShown: false,
            tabBarItemStyle: { width: 130 },
          }}
        />
        <Tab.Screen
          name="Đang giao"
          component={DeliveryOrders}
          //initialParams={{ DeliveryingOrders, userData, userInfo }}
          options={{
            headerShown: false,
            tabBarItemStyle: { width: 130 },
          }}
        />
        {/* <Tab.Screen
          name="Đã giao"
          //component={DoneOrdersScreen}
          //initialParams={{ DoneOrders, userData, userInfo }}
          options={{ headerShown: false }}
        /> */}
        <Tab.Screen
          name="Đã huỷ"
          component={CanceledOrders}
          //initialParams={{ CancelOrders, userData, userInfo }}
          options={{
            headerShown: false,
            tabBarItemStyle: { width: 130 },
          }}
        />
        <Tab.Screen
          name="Hoàn tất"
          component={DoneOrders}
          //initialParams={{ CancelOrders, userData, userInfo }}
          options={{
            headerShown: false,
            tabBarItemStyle: { width: 130 },
          }}
        />
      </Tab.Navigator>
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
  container: {
    height: "100%",
  },
});

// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import ConfirmingOrders from "./confirmingOrders";
// import DeliveryOrders from "./deliveryOrders";
// import CanceledOrders from "./canceledOrders";

// const Tab = createMaterialTopTabNavigator();

// export default function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={ConfirmingOrders} />
//       <Tab.Screen name="Settings" component={DeliveryOrders} />
//     </Tab.Navigator>
//   );
// }
