import React, { useState, useEffect, useRef } from "react";
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
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
  Chip,
} from "react-native-paper";
import { getInfo } from "../../helper/controller/clientAPI";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Card } from "react-native-elements";
import Modal from "react-native-modal";
import { PanGestureHandler } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeckSwiper from "react-native-deck-swiper";
import NumericInput from "react-native-numeric-input";
import { useIsFocused } from "@react-navigation/native";
import { getAllMainGroup } from "../../helper/controller/mainGroup";
import { getModelByMainGroup } from "../../helper/controller/shop";
import { getBannerAPI } from "../../helper/controller/promotion";
import {
  getAllModelFavForCustomer,
  updateModelFav,
} from "../../helper/controller/customerFav";
import { getAccountInfoAPI } from "../../helper/controller/profile";
const CardA = ({ imageUri }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{ uri: imageUri }} />
    </View>
  );
};
export default function Home({ navigation, route }) {
  //const { userData } = route.params;
  const [account, setAccount] = useState(null);
  const [favItems, setFavItems] = useState([]);
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dataSearch, setDataSearch] = React.useState({
    textSearch: "",
  });
  const [userInfo, setUserInfo] = useState({});
  const [accountInfo, setAccountInfo] = useState({});
  const [isShowLoadingModel, setIsShowLoadingModel] = useState(false);
  const [isFav, setIsFav] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  //const [cards, setCards] = useState(images);
  const [selected, setSelected] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [mainGroup, setMainGroup] = useState([]);
  const [modelList, setModelList] = useState([]);
  //console.log(modelList);
  modelList.sort((a, b) => a.brandId - b.brandId);
  // const brandMap = brandList.reduce((result, brand) => {
  //   result[brand.brandId] = brand.brandName;
  //   return result;
  //   }, {});
  const groupedModels = modelList.reduce((result, model) => {
    //console.log(model);
    const brandId = model.brandId;
    const brandName = model.brandName;
    //console.log(brandName);
    if (!result[brandId]) {
      result[brandId] = { brandName, models: [] };
    }
    result[brandId].models.push(model);
    //console.log(result);
    return result;
  }, {});
  const getAccount = async () => {
    const accountFromStorage = await AsyncStorage.getItem("account");
    setAccount(JSON.parse(accountFromStorage));
    getAccountInfo(accountFromStorage);
  };
  const getAccountInfo = async (accountId) => {
    const result = await getAccountInfoAPI(accountId);
    //console.log(result);
    if (result.status == 200) {
      setAccountInfo(result.data.data.customers.md_customer_info);
      //console.log(result.data.data.customers.md_customer_info);
    } else {
      setVisible(false);
      // Alert.alert("Thông báo", "Sự cố lấy thông tin");
    }
  };
  const handleSelect = (group, valueId) => {
    setSelected((prevSelected) => ({ ...prevSelected, [group]: valueId }));
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const renderCard = (cards, index) => {
    return <CardA imageUri={cards.url} />;
  };

  const handleGesture = (e) => {
    // handle gesture here
  };

  const [bannerList, setBannerList] = useState([]);
  //console.log(bannerList);
  const carouselItems = [
    {
      url: "https://vietmartjp.com/wp-content/uploads/2020/10/thumbnail-khuyen-mai-chong-khuyen-maiArtboard-1.jpg",
    },
    {
      url: "https://www.sonha.net.vn/media/news/0310_khuyen-mai-son-ha-10-10.jpg",
    },

    {
      url: "https://www.sonha.net.vn/media/news/0310_khuyen-mai-son-ha-10-10.jpg",
    },
  ];
  const textInputChange = (val) => {
    setDataSearch({
      ...dataSearch,
      textSearch: val,
    });
  };

  const getAllMainGroupForApp = async () => {
    setVisible(true);
    const result = await getAllMainGroup();
    if (result.status === 200) {
      setVisible(false);
      setMainGroup(result.data.data.maingroups);
    } else {
      setVisible(false);
    }
  };
  const getFavModel = async (customerId) => {
    const result = await getAllModelFavForCustomer(customerId);
    if (result.status === 200) {
      {
        setFavItems(result.data.data.modelList);
      }
    }
  };

  const updateModelFavDetail = async (customerId, modelId, isActived) => {
    const result = await updateModelFav(customerId, modelId, isActived);
    if (result.status === 200) {
      //Alert.alert("Thông báo", "Thêm thành công");
      getFavModel(account);
    } else {
      Alert.alert("Thông báo", "Có lỗi");
    }
  };
  const handleFav = (item) => {
    updateModelFavDetail(account, item.modelId, !item.isActived);

    //console.log(account, item.modelId, item.isActived);
  };
  const getModelListGroupByBrand = async () => {
    const result = await getModelByMainGroup(null, null, null, 50);
    if (result.status === 200) {
      setModelList(result.data.data.modelList);
      setIsShowLoadingModel(false);
    }
  };
  const setTime = () => {
    setTimeout(() => {
      setIsShowLoadingModel(true);
    }, 5000);
  };
  const getBannerList = async () => {
    const result = await getBannerAPI(1, null);
    //console.log(result);
    if (result.status === 200) {
      setBannerList(result.data.data);
    }
  };
  useEffect(() => {
    getBannerList();
    getAllMainGroupForApp();
    getAccount();
    setTime();
    getFavModel(account);
    getModelListGroupByBrand();
  }, [isFocused]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerTitle}>
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 100,
            borderWidth: 3,
            borderColor: "#ffffff",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#cccccc",
            flexDirection: "row",
          }}
        >
          {accountInfo.firstname && (
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {accountInfo.firstname.charAt(0)}
            </Text>
          )}
          {accountInfo.lastname && (
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {accountInfo.lastname.charAt(0)}
            </Text>
          )}
        </View>
        {account === null ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("signInScreen");
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginBottom: 8,
                paddingLeft: 4,
              }}
            >
              Mời bạn đăng nhập!
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.title}>
            <Text style={styles.textTitle}>
              {"Xin chào, " +
                accountInfo.firstname +
                " " +
                accountInfo.lastname +
                "!"}
            </Text>
          </View>
        )}
      </View>
      <View>
        <View style={styles.searchMargin}>
          <View style={styles.search}>
            <TextInput
              placeholder="Bạn muốn tìm gì?"
              placeholderTextColor="#C0C0C0"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(val) => textInputChange(val)}
            />
            <TouchableOpacity
              onPress={() => {
                if (dataSearch.textSearch.length > 0) {
                  navigation.navigate("productSearch", {
                    keyWord: dataSearch.textSearch,
                  });
                }
              }}
            >
              <View style={styles.iconSearch}>
                {/* <FontAwesome name="search" color="#05375a" size={30} /> */}
                <Feather name="search" color="#05375a" size={30} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 25,
              marginTop: 10,
            }}
          >
            <View style={{ flex: 3, alignItems: "flex-start" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Các chương trình ưu đãi
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ fontSize: 15 }}>Tất cả</Text>
            </View>
          </View>

          <View
            style={{
              marginRight: 20,
              marginTop: 0,
              zIndex: 1,
              flex: 0,
            }}
          >
            {bannerList.length !== 0 && (
              <DeckSwiper
                cards={bannerList}
                verticalSwipe={false}
                renderCard={(item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("promotionDetail", {
                        promotionProgram: item,
                      });
                      //console.log(item.promotionProgramId);
                    }}
                    activeOpacity={0.8}
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Image
                      style={{
                        width: 380,
                        height: 200,
                        borderRadius: 10,
                      }}
                      source={{
                        uri: item.bannerImagePath,
                      }}
                    />
                    {/* <Text>{item.promotionProgramName}</Text> */}
                  </TouchableOpacity>
                )}
                //onSwipedLeft={onSwipeLeft}
                backgroundColor={"transparent"}
                stackSize={bannerList.length > 2 ? 2 : bannerList.length}
                cardIndex={0}
                // useViewOverflow={false}
                infinite={true}
                cardVerticalMargin={20}
                cardVerticalThreshold={0}
                containerStyle={{
                  marginTop: -10,
                }}
              />
            )}
          </View>

          <View
            style={{
              marginLeft: 20,
              marginRight: 20,

              marginTop: 230,
            }}
          ></View>
          {account && (
            <View
              style={{
                zIndex: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 25,
                  marginTop: 10,
                  zIndex: 2,
                }}
              >
                <View style={{ flex: 3, alignItems: "flex-start" }}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Yêu thích
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginLeft: 5,
                  marginRight: 5,
                  zIndex: 2,
                }}
              >
                {favItems &&
                  favItems.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("shopDetailScreen", {
                            modelId: item.modelId,
                            modelPrice: item.modelPrice,
                            maingroupId: item.maingroupId,
                            subgroupId: item.subgroupId,
                            modelStockAmount: item.amount,
                          });
                        }}
                        key={index}
                      >
                        <Card
                          containerStyle={{
                            borderRadius: 10,
                            marginTop: 8,
                            borderWidth: 0,
                            shadowColor: "#dddddd",
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 2 }}>
                              <Image
                                source={{
                                  uri: item.modelImagePath,
                                }}
                                style={{
                                  width: 100,
                                  height: 100,
                                  borderRadius: 10,
                                }}
                              />
                            </View>
                            <View
                              style={{
                                flex: 3,
                                justifyContent: "center",
                              }}
                            >
                              <View style={{ padding: 4 }}>
                                <Text
                                  style={{ fontSize: 16, fontWeight: "bold" }}
                                >
                                  {item.modelName}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "flex-end",
                                  padding: 4,
                                }}
                              >
                                <Text>Giá:</Text>
                                <Text
                                  style={{ fontSize: 18, color: "#FF0000" }}
                                >
                                  {"đ" + item.modelPrice.toLocaleString()}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: "flex-end",
                                justifyContent: "center",
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => handleFav(item)}
                                style={{
                                  marginRight: 0,
                                  width: 45,
                                  height: 45,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: 5,
                                }}
                              >
                                <FontAwesome
                                  name="heart"
                                  color="#ff0000"
                                  size={30}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Card>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </View>
          )}
          <View
            style={{
              zIndex: 2,
            }}
          >
            {Object.keys(groupedModels).map((brandId) => {
              const brand = groupedModels[brandId];
              return (
                <View
                  key={brandId}
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 20,
                      backgroundColor: "#FF6347",
                      paddingVertical: 8,
                      marginHorizontal: 18,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      {brand.brandName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      paddingHorizontal: 22,
                      paddingTop: 4,
                    }}
                  >
                    {brand.models.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          navigation.navigate("shopDetailScreen", {
                            modelId: item.modelId,
                            modelPrice: item.modelPrice,
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
                            width: 175,
                            height: 260,
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
                                    fontSize: 15,
                                    textAlign: "center",
                                    maxWidth: 160,
                                    // whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    // textOverflow: "ellipsis",
                                  }}
                                >
                                  {item.modelName.length > 20
                                    ? `${item.modelName.slice(0, 20)}...`
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
                                    paddingTop: 4,
                                  }}
                                >
                                  {"đ" + item.discountValue.toLocaleString()}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </Card>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              );
            })}
            {/* {Object.keys(groupedModels).map((models, index) => (
              <View
                key={index}
                style={{
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                    backgroundColor: "#FF6347",
                    paddingVertical: 8,
                    marginHorizontal: 18,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    {models.brandName}
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: 18,
                    backgroundColor: "#FFE4E1",
                    paddingTop: 4,
                    paddingHorizontal: 3,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      zIndex: 2,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      paddingBottom: 5,
                    }}
                  >
                    {groupedModels.models.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          navigation.navigate("shopDetailScreen", {
                            modelId: item.modelId,
                            modelPrice: item.modelPrice,
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
                            width: 175,
                            height: 260,
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
                                    fontSize: 15,
                                    textAlign: "center",
                                    maxWidth: 160,
                                    // whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    // textOverflow: "ellipsis",
                                  }}
                                >
                                  {item.modelName.length > 20
                                    ? `${item.modelName.slice(0, 20)}...`
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
                                    paddingTop: 4,
                                  }}
                                >
                                  {"đ" + item.discountValue.toLocaleString()}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </Card>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            ))} */}
            {isShowLoadingModel && (
              <View>
                <ActivityIndicator size="large" />
              </View>
            )}
          </View>
        </View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    height: 110,
    flexDirection: "row",
    borderRadius: 40,
    marginLeft: 16,
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  bottomSheet: {
    backgroundColor: "#dddddd",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    backgroundColor: "gray",
    height: 6,
    width: 40,
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 8,
  },
  paddingHandle: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  /////////
  // containera: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#F5FCFF",
  // },
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
});
