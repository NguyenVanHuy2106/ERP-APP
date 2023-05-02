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

export default function ProductWithCat({ navigation, route }) {
  let subGroupId = route.params.subGroupId;
  var subGroupName = route.params.subGroupName;
  const [dataSearch, setDataSearch] = useState({
    textSearch: "",
  });
  const [visible, setVisible] = useState(false);
  const [subGroupList, setSubGroupList] = useState([]);
  const [mainGroupList, setMainGroupList] = useState([]);
  const [modelList, setModelList] = useState([]);

  const textInputChange = (val) => {
    setDataSearch({
      ...dataSearch,
      textSearch: val,
    });
  };
  const getModelByMainGroupId = async (subGroupId) => {
    setVisible(true);
    const result = await getModelByMainGroup(null, subGroupId, null, 40);
    if (result.status == 200) {
      //console.log(result.data.data.modelList);
      setModelList(result.data.data.modelList);
      setVisible(false);
    } else {
      setVisible(true);
      Alert.alert("Thông báo", "Lỗi lấy dữ liệu");
    }
  };

  useEffect(() => {
    getModelByMainGroupId(subGroupId);
  }, []);
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
        <Text style={styles.returnText}>Danh mục hàng</Text>
      </View>
      <ScrollView style={{ height: "90%" }}>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 24,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontStyle: "italic",
              fontSize: 16,
            }}
          >
            Kết quả :
          </Text>
          <Text
            style={{ fontWeight: "bold", fontSize: 18, fontStyle: "italic" }}
          >
            {" "}
            {subGroupName}
          </Text>
        </View>
        {modelList && (
          <View
            style={{
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              zIndex: 2,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
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
                    });
                  }}
                >
                  <Card
                    containerStyle={{
                      marginLeft: 5,
                      marginRight: 5,
                      marginTop: 5,
                      marginBottom: 5,
                      width: 180,
                      height: 250,
                      borderRadius: 10,
                      borderWidth: 0,
                      shadowColor: "#EEEEEE",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
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
                            {item.modelName}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          paddingTop: 8,
                          flexDirection: "row",
                          alignItems: "center",
                          paddingLeft: 10,
                        }}
                      >
                        <Text
                          style={{
                            width: 170,
                            paddingLeft: 4,
                            fontSize: 15,
                            color: "#cc0000",
                            fontWeight: "bold",
                          }}
                        >
                          {"đ" + item.modelPrice.toLocaleString()}
                        </Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
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
