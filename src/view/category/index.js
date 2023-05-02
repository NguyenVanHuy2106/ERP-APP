import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
  Chip,
} from "react-native-paper";
// import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getAllMainGroup } from "../../helper/controller/mainGroup";
import { getSubGroupByMainGroup } from "../../helper/controller/subGroup";
export default function Category({ navigation }) {
  const [mainGroupList, setMainGroupList] = useState([]);
  const [subGroupList, setSubGroupList] = useState([]);
  const [mainGroupName, setMainGroupName] = useState("");

  const getMainGroup = async () => {
    const result = await getAllMainGroup();
    if (result.status == 200) {
      setMainGroupList(result.data.data.maingroups);
    }
  };
  const handleSubGroupList = async (mainGroupId) => {
    const result = await getSubGroupByMainGroup(mainGroupId);
    if (result.status == 200) {
      setSubGroupList(result.data.data.subgroups);
      //console.log(result.data.data.subgroups);
    }
  };
  useEffect(() => {
    getMainGroup();
    handleSubGroupList(1);
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
        <Text style={styles.returnText}>Danh mục hàng</Text>
      </View>
      <View style={{ flexDirection: "row", height: "92%" }}>
        <View style={{ height: "93%", marginTop: 10 }}>
          <FlatList
            data={mainGroupList}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    handleSubGroupList(item.maingroupId);
                    setMainGroupName(item.maingroupName);
                  }}
                  key={index}
                  activeOpacity={0.3}
                  style={{
                    paddingLeft: 7,
                    paddingRight: 7,
                    paddingBottom: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Image
                    source={{
                      uri: item.maingroupImagePath,
                    }}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 15,
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 5,
                      width: 80,
                      flexWrap: "wrap",
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
            marginRight: 20,
            backgroundColor: "#ffffff",
            width: "80%",
          }}
        >
          {subGroupList && (
            <ScrollView>
              <View>
                <Text
                  style={{
                    marginBottom: 10,
                    fontWeight: "bold",
                    fontSize: 16,
                    marginTop: 5,
                    marginLeft: 15,
                  }}
                >
                  {mainGroupName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {subGroupList.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("productWithCat", {
                        subGroupId: item.subgroupId,
                        subGroupName: item.subgroupName,
                      });
                    }}
                    key={index}
                    style={{
                      paddingHorizontal: 20,
                      marginBottom: 20,
                    }}
                  >
                    <Image
                      source={{
                        uri: item.subgroupImagePath,
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 15,
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 5,
                        width: 60,
                        flexWrap: "wrap",
                        textAlign: "center",
                      }}
                    >
                      {item.subgroupName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
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
