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
export default function ShopDetail({ navigation, route }) {
  let modelId = route.params.modelId;
  //console.log(modelId);
  let modelPrice = route.params.modelPrice;
  let modelStockAmount = route.params.modelStockAmount;
  const [isFav, setIsFav] = useState(0);
  const [maxStockLimit, setMaxStockLimit] = useState(modelStockAmount);
  const [stockQuantity, setStockQuantity] = useState(modelStockAmount);
  const [account, setAccount] = useState(null);
  let maingroupId = route.params.maingroupId;
  let subgroupId = route.params.subgroupId;
  const [productId, setProductId] = useState("");
  const [priceOfVarrant, setPriceOfVarrant] = useState(modelPrice);
  const [maxLevelVarantProduct, setMaxLevelVarantProduct] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  //console.log(isVisible);
  const [visible, setVisible] = useState(false);
  const [modelInfo, setModelInfo] = useState({});
  const [imageAvatar, setImageAvatar] = useState("");
  const [imageVarrantAvatar, setImageVarrantAvatar] = useState("");
  const [modelDescriptionAttribute, setModelDescriptionAttribute] = useState(
    []
  );
  const [imageList, setImageList] = useState([]);
  const [modelVarrant, setModelVarrant] = useState([]);
  //const [cards, setCards] = useState(images);

  //const [cards, setCards] = useState(images);
  const [selected, setSelected] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [varant, setVarrant] = useState([]);
  const [relateModel, setRelateModel] = useState([]);
  const [statePrice, setStatePrice] = useState(false);
  //console.log(varant);

  const [selectedChipId, setSelectedChipId] = useState(null); // Lưu trữ trạng thái được chọn của Chip
  const getAccount = async () => {
    const accountFromStorage = await AsyncStorage.getItem("account");
    setAccount(JSON.parse(accountFromStorage));
    getModelInfo(JSON.parse(accountFromStorage), modelId);
  };
  const handleSelect = (indexOption, group, valueId) => {
    setSelected((prevSelected) => ({ ...prevSelected, [group]: valueId }));
    const updateSelection = {
      level: indexOption + 1,
      modelVarantAttributeId: group,
      modelVarantAttributeValueId: valueId,
    };

    setVarrant((prevSelections) => {
      const index = prevSelections.findIndex(
        (selection) => selection.modelVarantAttributeId === group
      );
      // if (index >= 0) {
      //   // The attribute is already selected, update the value
      //   return prevSelections.map((selection, i) =>
      //     i === index ? { ...selection, ...updateSelection } : selection
      //   );
      // } else {
      //   // The attribute is not yet selected, add a new selection
      //   return [...prevSelections, updateSelection];
      // }
      if (index >= 0) {
        // The attribute is already selected, update the value
        const newSelections = prevSelections.map((selection, i) =>
          i === index ? { ...selection, ...updateSelection } : selection
        );
        console.log("New selections:", newSelections);
        if (newSelections.length === maxLevelVarantProduct) {
          getProductId(modelId, newSelections);
          //setPriceOfProductId(0);
        }

        return newSelections;
      } else {
        // The attribute is not yet selected, add a new selection
        const newSelections = [...prevSelections, updateSelection];
        console.log("New selections add:", newSelections);
        if (newSelections.length === maxLevelVarantProduct) {
          getProductId(modelId, newSelections);
          //setPriceOfProductId(0);
        }
        //console.log("New selections abc:", newSelections);
        return newSelections;
      }
    });
  };
  const getProductId = async (modelId, varant) => {
    //console.log(modelId, varant);
    //console.log(modelId);
    setStatePrice(true);
    const result = await getProductIdByVarrant(modelId, varant);
    //console.log(result);
    if (result.status === 200) {
      setStatePrice(false);
      //console.log(result.data.data.productId);
      setProductId(result.data.data.productId);
      setStockQuantity(result.data.data.amount);
      if (result.data.data.isCreatedPriceOfProduct === false) {
        setPriceOfVarrant(result.data.data.priceOfModel);
        //console.log("modelId", result.data.data.priceOfModel);
      } else {
        setPriceOfVarrant(result.data.data.priceOfProduct);
        //console.log("productid", result.data.data.priceOfProduct);
      }
    } else {
    }
  };
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };
  const setTime = () => {
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  };
  const getModelInfo = async (account, modelId) => {
    setVisible(true);
    const result = await getModelInfoAPI(account, modelId);
    //console.log(account, modelId);
    //console.log(result);
    if (result.status == 200) {
      //console.log(result.data.modelInformation);
      //console.log(result.data.serverModel);
      setModelInfo(result.data.data.modelInformation);
      setMaxLevelVarantProduct(
        result.data.data.modelInformation.maxLevelVarantProduct
      );
      setImageAvatar(result.data.data.modelInformation.modelImagePath);
      setImageVarrantAvatar(result.data.data.modelInformation.modelImagePath);
      setModelVarrant(result.data.data.modelInformation.modelVarantProduct);
      setModelDescriptionAttribute(
        result.data.data.modelInformation.modelDescriptionAttribute
      );
      setIsFav(result.data.data.modelInformation.isFavouriteModel);
      setImageList(result.data.data.modelInformation.modelImagePathList);
      getRelateModel(
        result.data.data.modelInformation.maingroupId,
        result.data.data.modelInformation.subgroupId
      );
      setVisible(false);
    } else {
      setVisible(false);
      Alert.alert("Thông báo", "Lỗi lấy dữ liệu");
    }
  };
  const getRelateModel = async (mainGroupId, subGroupId) => {
    const result = await getModelByMainGroup(mainGroupId, subGroupId, null, 10);
    if (result.status === 200) {
      //console.log(result.data.data.modelList);
      setRelateModel(result.data.data.modelList);
    }
  };

  const handleAddtoCart = async (productId, quantity) => {
    // userLogIn,
    // modelId,
    // productId,
    // subgroupId,
    // brandId,
    // quantity,
    // inventoryStatusId
    setVisible(true);
    // console.log(
    //   account,
    //   modelId,
    //   productId.length === 0 ? null : productId,
    //   modelInfo.subgroupId,
    //   modelInfo.brandId,
    //   quantity
    // );
    const result = await addToCart(
      account,
      modelId,
      productId.length === 0 ? null : productId,
      modelInfo.subgroupId,
      modelInfo.brandId,
      quantity,
      1
    );
    console.log(
      account,
      modelId,
      productId.length === 0 ? null : productId,
      modelInfo.subgroupId,
      modelInfo.brandId,
      quantity
    );
    if (result.status === 200) {
      setVisible(false);
      Alert.alert("Thông báo", "Thêm vào giỏ hàng thành công");
      setIsVisible(false);
    }
  };

  const updateModelFavDetail = async (customerId, modelId, isActived) => {
    const result = await updateModelFav(customerId, modelId, isActived);
    if (result.status === 200) {
      Alert.alert("Thông báo", "Thêm thành công");
    } else {
      Alert.alert("Thông báo", "Có lỗi");
    }
  };
  const handleFav = () => {
    updateModelFavDetail(account, modelId, !isFav);
    //console.log("Huy");
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
      <View>
        <View
          style={{
            zIndex: 2,
            position: "absolute",
            top: 5,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "flex-end",
            backgroundColor: "rgba(211, 211, 211, 0.5)",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 12,
              marginVertical: 4,
            }}
          >
            <TouchableOpacity
              onPress={() => handleFav()}
              style={{
                borderWidth: 1,
                borderRadius: 50,
                marginHorizontal: 10,

                borderColor: "#ff0000",
              }}
            >
              {isFav === 0 ? (
                <AntDesign
                  name="hearto"
                  size={25}
                  color="#ff0000"
                  style={{ padding: 5 }}
                />
              ) : (
                <AntDesign
                  name="heart"
                  size={25}
                  color="#ff0000"
                  style={{ padding: 5 }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("cartScreen");
              }}
              style={{
                borderWidth: 1,
                borderRadius: 50,
                marginHorizontal: 10,
                borderColor: "#ff0000",
              }}
            >
              <AntDesign
                name="shoppingcart"
                size={25}
                color="#ff0000"
                style={{ padding: 5 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={{ height: "87%" }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginBottom: 20 }}>
            <View style={{ width: "100%" }}>
              <View
                style={{
                  backgroundColor: "#ffffff",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 10,
                }}
              >
                <Image
                  source={{
                    uri: imageAvatar
                      ? imageAvatar
                      : "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg",
                  }}
                  style={{
                    width: "70%",
                    height: 300,
                    marginTop: 10,
                    marginRight: 10,
                    marginLeft: 10,
                    borderRadius: 5,
                  }}
                />
              </View>
              <View
                style={{ flexDirection: "row", backgroundColor: "#ffffff" }}
              >
                <FlatList
                  data={imageList}
                  horizontal
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 100,
                          justifyContent: "center",
                          paddingLeft: 10,
                        }}
                        onPress={() => {
                          //console.log(item);
                          setImageAvatar(item);
                          // setIsVisible(true);
                        }}
                      >
                        <Image
                          source={{
                            uri: item
                              ? item
                              : "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg",
                          }}
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: 5,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
            <View
              style={{
                paddingTop: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffffff",
                  paddingLeft: 20,
                  height: 80,
                }}
              >
                <Text style={{ fontSize: 20, marginTop: 10, fontSize: 24 }}>
                  {modelInfo.modelName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",

                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "flex-end",
                      alignItems: "flex-end",

                      paddingBottom: 2,
                    }}
                  >
                    <Text>{"Còn lại: " + modelStockAmount}</Text>
                  </View>
                  <View
                    style={{
                      marginRight: 20,
                      marginTop: 4,
                      justifyContent: "flex-end",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 26,
                        color: "#ff0000",
                        fontWeight: "bold",
                      }}
                    >
                      {modelPrice.toLocaleString()}
                    </Text>
                    <Text style={{ fontSize: 18, color: "#ff0000" }}>
                      {" VNĐ"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {relateModel && (
              <View style={{ backgroundColor: "#ffffff", marginTop: 4 }}>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    fontSize: 18,
                  }}
                >
                  Sản phẩm tương tự
                </Text>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingBottom: 12,
                  }}
                >
                  <FlatList
                    data={relateModel}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setVisible(true);
                            getModelInfo(account, item.modelId);
                            getRelateModel(item.maingroupId, item.subgroupId);
                            // setVisible(true);
                            // navigation.navigate("shopDetailScreen", {
                            //   modelId: item.modelId,
                            //   modelPrice: item.modelPrice,
                            // });
                          }}
                        >
                          <Card
                            containerStyle={{
                              marginLeft: 5,
                              marginRight: 5,
                              marginTop: 5,
                              marginBottom: 5,
                              width: 130,
                              height: 200,
                              borderRadius: 10,
                              borderWidth: 0,
                              backgroundColor: "#EEEEEE",
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
                                    width: 100,
                                    height: 100,
                                    marginLeft: 0,
                                    marginRight: 0,
                                    borderRadius: 10,
                                  }}
                                />
                                <View style={{ marginTop: 20 }}>
                                  <Text
                                    style={{
                                      width: 120,
                                      textAlign: "center",
                                      fontSize: 13,
                                      flexWrap: "wrap",
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
                                    width: 200,
                                    paddingLeft: 0,
                                    fontSize: 15,
                                    color: "#cc0000",
                                  }}
                                >
                                  {"đ" + item.modelPrice.toLocaleString()}
                                </Text>
                              </View>
                            </View>
                          </Card>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>
            )}
            <View style={{ marginTop: 4 }}>
              <View style={{ backgroundColor: "#ffffff" }}>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    fontSize: 18,
                  }}
                >
                  Mô tả sản phẩm
                </Text>
              </View>
              <View style={{ backgroundColor: "#ffffff" }}>
                <Text
                  style={{
                    marginHorizontal: 20,
                    fontSize: 16,
                    color: "#777777",
                    marginBottom: 12,
                    textAlign: "justify",
                  }}
                >
                  {modelInfo.modelDescription}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                backgroundColor: "#ffffff",
                paddingBottom: 16,
              }}
            >
              <View>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    fontSize: 18,
                  }}
                >
                  Chi tiết sản phẩm
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 2, marginLeft: 20 }}>
                  <Text style={{ fontSize: 16, color: "#777777" }}>
                    Ngành hàng
                  </Text>
                </View>
                <View style={{ flex: 3 }}>
                  <Text style={{ fontSize: 16, color: "#777777" }}>
                    {modelInfo.maingroupName}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 16,
                }}
              >
                <View style={{ flex: 2, marginLeft: 20 }}>
                  <Text style={{ fontSize: 16, color: "#777777" }}>
                    Nhóm hàng
                  </Text>
                </View>
                <View style={{ flex: 3 }}>
                  <Text style={{ fontSize: 16, color: "#777777" }}>
                    {modelInfo.subgroupName}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 16,
                }}
              >
                <View style={{ flex: 2, marginLeft: 20 }}>
                  <Text style={{ fontSize: 16, color: "#777777" }}>Đơn vị</Text>
                </View>
                <View style={{ flex: 3 }}>
                  <Text style={{ fontSize: 16, color: "#777777" }}>
                    {modelInfo.quantityUnitName}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 16,
                }}
              >
                <View style={{ flex: 2, marginLeft: 20 }}>
                  <Text style={{ fontSize: 16, color: "#777777" }}>
                    Thương hiệu
                  </Text>
                </View>
                <View style={{ flex: 3 }}>
                  <Text style={{ fontSize: 16, color: "#777777" }}>
                    {modelInfo.brandName}
                  </Text>
                </View>
              </View>
              <View style={{ marginBottom: 12 }}>
                {modelDescriptionAttribute.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{ flexDirection: "row", marginTop: 16 }}
                    >
                      <View style={{ flex: 2, marginLeft: 20 }}>
                        <Text style={{ fontSize: 16, color: "#777777" }}>
                          {item.modelAttributeName}
                        </Text>
                      </View>
                      <View style={{ flex: 3 }}>
                        <Text style={{ fontSize: 16, color: "#777777" }}>
                          {item.modelMDLAttributeValue}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          position: "absolute",
          bottom: -40,
          width: "100%",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            height: 50,
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
            }}
            activeOpacity={0.8}
            style={{
              paddingHorizontal: 30,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: "#CC0000",
              backgroundColor: "#ffffff",
              height: "100%",
              width: "55%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="shopping-cart" color="#CC0000" size={20} />
            <Text style={{ color: "#CC0000" }}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {}}
            style={{
              paddingHorizontal: 50,

              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#CC0000",
              width: "45%",
            }}
          >
            <Text style={{ fontSize: 16, color: "#ffffff" }}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Modal
          isVisible={isVisible}
          // onSwipeComplete={() => {
          //   setIsVisible(false);
          //   setSelected({});
          //   setQuantity(1);
          // }}
          // swipeDirection={["down"]}
          style={styles.modal}
        >
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.bottomSheet}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.paddingHandle}
                onPress={() => {
                  setIsVisible(false);
                  setSelected({});
                  setQuantity(1);
                  setVarrant([]);
                }}
              >
                <View
                  style={{
                    height: 70,
                    width: 70,
                    backgroundColor: "#ff0000",
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 2,
                    paddingTop: 2,
                    borderRadius: 100,
                  }}
                >
                  <Ionicons name="close" size={40} color="#ffffff" />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: "#ffffff",
                  borderBottomWidth: 1,
                  borderBottomColor: "#dddddd",
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <Image
                  source={{
                    uri: imageVarrantAvatar
                      ? imageVarrantAvatar
                      : "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg",
                  }}
                  style={{
                    width: 120,
                    height: 120,
                    margin: 10,
                    borderRadius: 5,
                  }}
                />
                <View style={{ paddingBottom: 10 }}>
                  <View style={{ marginBottom: 10 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        width: "90%",
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                    >
                      {modelInfo.modelName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {statePrice && (
                      <ActivityIndicator size="small" color="#ff0000" />
                    )}
                    {priceOfVarrant != 0 && priceOfVarrant != null && (
                      <Text
                        style={{
                          fontSize: 22,
                          paddingRight: 8,
                          color: "#ff0000",
                        }}
                      >
                        {priceOfVarrant.toLocaleString()}
                      </Text>
                    )}
                    <Text style={{ color: "#FF0000" }}>VNĐ</Text>
                  </View>
                  <View>
                    <Text>{"Kho: " + stockQuantity}</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,

                  backgroundColor: "#ffffff",
                  justifyContent: "center",
                  maxHeight: 300,
                }}
              >
                {modelVarrant && (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingBottom: 10,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    {modelVarrant.map((item, indexOption) => (
                      <View key={item.modelVarantAttributeId}>
                        <View style={{ marginTop: 5 }}>
                          <Text>{item.modelVarantAttributeName}</Text>
                          <View
                            style={{ flexDirection: "row", flexWrap: "wrap" }}
                          >
                            {item.modelVarantProductValueList.map(
                              (itemValue, indexValue) => (
                                <View
                                  key={itemValue.modelVarantAttributeValueId}
                                  style={{
                                    paddingHorizontal: 2,
                                    paddingVertical: 2,
                                  }}
                                >
                                  <Chip
                                    key={itemValue.modelVarantAttributeValueId}
                                    style={{
                                      height: 40,
                                      backgroundColor: "#F6F6F6",
                                      borderWidth:
                                        selected[
                                          item.modelVarantAttributeId
                                        ] ===
                                        itemValue.modelVarantAttributeValueId
                                          ? 1
                                          : 1,
                                      //borderRadius: 4,
                                      // backgroundColor:
                                      //   selected[
                                      //     item.modelVarantAttributeId
                                      //   ] ===
                                      //   itemValue.modelVarantAttributeValueId
                                      //     ? "#F6F6F6"
                                      //     : "#F6F6F6",
                                      borderColor:
                                        selected[
                                          item.modelVarantAttributeId
                                        ] ===
                                        itemValue.modelVarantAttributeValueId
                                          ? "#FF0000"
                                          : "#F6F6F6",
                                    }}
                                    onPress={() =>
                                      //console.log(item.group, itemValue.valueId)
                                      {
                                        handleSelect(
                                          indexOption,
                                          item.modelVarantAttributeId,
                                          itemValue.modelVarantAttributeValueId
                                        );
                                        if (itemValue.varantProductImagePath) {
                                          // console.log(
                                          //   itemValue.varantProductImagePath
                                          // );
                                          setImageVarrantAvatar(
                                            itemValue.varantProductImagePath
                                          );
                                        }
                                      }
                                    }
                                  >
                                    <View
                                      style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingTop: 4,
                                        flexDirection: "row",
                                      }}
                                    >
                                      {itemValue.varantProductImagePath && (
                                        <Image
                                          source={{
                                            uri: itemValue.varantProductImagePath
                                              ? itemValue.varantProductImagePath
                                              : "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg",
                                          }}
                                          style={{
                                            width: 20,
                                            height: 20,
                                            paddingRight: 4,
                                          }}
                                        />
                                      )}
                                      <Text style={{ padding: 4 }}>
                                        {
                                          itemValue.modelVarantAttributeValueName
                                        }
                                      </Text>
                                    </View>
                                  </Chip>
                                </View>
                              )
                            )}
                          </View>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                )}
              </View>
              <View
                style={{
                  padding: 10,
                  marginTop: 1,
                  backgroundColor: "#DDDDDD",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <View style={{ paddingLeft: 20, paddingTop: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Chọn số lượng</Text>
                </View>
                <View
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    marginRight: 20,
                  }}
                >
                  <NumericInput
                    value={quantity}
                    onChange={handleQuantityChange}
                    totalWidth={120}
                    totalHeight={35}
                    minValue={0}
                    maxValue={stockQuantity}
                    step={1}
                    valueType="real"
                    rounded
                    textColor="#000000"
                    iconStyle={{ color: "white" }}
                    rightButtonBackgroundColor="#CC0000"
                    leftButtonBackgroundColor="#CC0000"
                  />
                </View>
              </View>
              <View
                style={{
                  padding: 10,
                  backgroundColor: "#DDDDDD",
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleAddtoCart(productId, quantity)}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 15,
                    backgroundColor: "#CC0000",
                  }}
                >
                  <Text style={{ fontSize: 16, color: "#ffffff" }}>
                    Thêm vào giỏ hàng
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>

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
