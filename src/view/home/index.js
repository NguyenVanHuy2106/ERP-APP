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
import DeckSwiper from "react-native-deck-swiper";
import NumericInput from "react-native-numeric-input";
import { getAllMainGroup } from "../../helper/controller/mainGroup";
const CardA = ({ imageUri }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{ uri: imageUri }} />
    </View>
  );
};
export default function Home({ navigation, route }) {
  //const { userData } = route.params;
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = React.useState({
    textSearch: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  //const [cards, setCards] = useState(images);
  const [selected, setSelected] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [mainGroup, setMainGroup] = useState([]);

  const handleSelect = (group, valueId) => {
    setSelected((prevSelected) => ({ ...prevSelected, [group]: valueId }));
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  // const onSwipeLeft = (index) => {
  //   const newCards = cards.slice();
  //   newCards.splice(index, 1);
  //   setCards(newCards);
  // };

  const renderCard = (cards, index) => {
    return <CardA imageUri={cards.url} />;
  };

  const handleGesture = (e) => {
    // handle gesture here
  };

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
  const catList = [
    {
      url: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/8/23/trai-cay-1661273148441334609720.jpg",
      name: "Trái cây",
    },
    {
      url: "https://bizweb.dktcdn.net/thumb/large/100/399/392/products/ao-polo-nam-cao-cap-hiddle-h7-t7.jpg?v=1665028849000",
      name: "Trái cây",
    },
    {
      url: "https://tietkiemdiennang.net/wp-content/uploads/2020/08/dien-lanh-la-gi-2-scaled.jpg",
      name: "Trái cây",
    },
    {
      url: "https://www.sonha.net.vn/media/news/0310_khuyen-mai-son-ha-10-10.jpg",
      name: "Trái cây",
    },

    {
      url: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/8/23/trai-cay-1661273148441334609720.jpg",
      name: "Trái cây",
    },
    {
      url: "https://bizweb.dktcdn.net/thumb/large/100/399/392/products/ao-polo-nam-cao-cap-hiddle-h7-t7.jpg?v=1665028849000",
      name: "Trái cây",
    },
    {
      url: "https://tietkiemdiennang.net/wp-content/uploads/2020/08/dien-lanh-la-gi-2-scaled.jpg",
      name: "Trái cây",
    },
    {
      url: "https://www.sonha.net.vn/media/news/0310_khuyen-mai-son-ha-10-10.jpg",
      name: "Trái cây",
    },

    {
      url: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/8/23/trai-cay-1661273148441334609720.jpg",
      name: "Trái cây",
    },
    {
      url: "https://bizweb.dktcdn.net/thumb/large/100/399/392/products/ao-polo-nam-cao-cap-hiddle-h7-t7.jpg?v=1665028849000",
      name: "Trái cây",
    },
    {
      url: "https://tietkiemdiennang.net/wp-content/uploads/2020/08/dien-lanh-la-gi-2-scaled.jpg",
      name: "Trái cây",
    },
    {
      url: "https://www.sonha.net.vn/media/news/0310_khuyen-mai-son-ha-10-10.jpg",
      name: "Trái cây",
    },

    {
      url: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/8/23/trai-cay-1661273148441334609720.jpg",
      name: "Trái cây",
    },

    {
      url: "https://tietkiemdiennang.net/wp-content/uploads/2020/08/dien-lanh-la-gi-2-scaled.jpg",
      name: "Trái cây",
    },
    {
      url: "https://www.sonha.net.vn/media/news/0310_khuyen-mai-son-ha-10-10.jpg",
      name: "Trái cây",
    },
  ];
  const FavItems = [
    {
      url: "https://vietmartjp.com/wp-content/uploads/2020/10/thumbnail-khuyen-mai-chong-khuyen-maiArtboard-1.jpg",
      name: "Trái xoài",
      price: "100000",
      priceEdit: "80000",
    },
    {
      url: "https://vietmartjp.com/wp-content/uploads/2020/10/thumbnail-khuyen-mai-chong-khuyen-maiArtboard-1.jpg",
      name: "Trái xoài",
      price: "100000",
      priceEdit: "80000",
    },
    {
      url: "https://vietmartjp.com/wp-content/uploads/2020/10/thumbnail-khuyen-mai-chong-khuyen-maiArtboard-1.jpg",
      name: "Trái xoài",
      price: "100000",
      priceEdit: "80000",
    },
    {
      url: "https://vietmartjp.com/wp-content/uploads/2020/10/thumbnail-khuyen-mai-chong-khuyen-maiArtboard-1.jpg",
      name: "Trái xoài",
      price: "100000",
      priceEdit: "80000",
    },
    {
      url: "https://vietmartjp.com/wp-content/uploads/2020/10/thumbnail-khuyen-mai-chong-khuyen-maiArtboard-1.jpg",
      name: "Trái xoài",
      price: "100000",
      priceEdit: "80000",
    },
  ];
  const varriant = [
    {
      group: 1,
      name: "Màu sắc",
      value: [
        {
          valueId: 1,
          valueName: "Đen",
        },
        {
          valueId: 2,
          valueName: "Trắng",
        },
        {
          valueId: 3,
          valueName: "Vàng",
        },
        {
          valueId: 4,
          valueName: "Xanh",
        },
        {
          valueId: 5,
          valueName: "Xanh ngọc",
        },
        {
          valueId: 6,
          valueName: "Xám",
        },
      ],
    },
    {
      group: 2,
      name: "Dung lượng",
      value: [
        {
          valueId: 1,
          valueName: "64GB",
        },
        {
          valueId: 2,
          valueName: "128GB",
        },
        {
          valueId: 3,
          valueName: "256GB",
        },
      ],
    },
    {
      group: 3,
      name: "Độ mới",
      value: [
        {
          valueId: 1,
          valueName: "90%",
        },
        {
          valueId: 2,
          valueName: "99%",
        },
      ],
    },
  ];

  // const fetchdata = async () => {
  //   const result = await getInfo(userData);
  //   if (result.status == 200) {
  //     setData(result.data.information);
  //   }
  // };
  const textInputChange = (val) => {
    setDataSearch({
      ...dataSearch,
      textSearch: val,
    });
  };
  const addToCart = () => {
    console.log(selected);
  };

  const getAllMainGroupForApp = async () => {
    const result = await getAllMainGroup();
    if (result.status === 200) {
      setMainGroup(result.data.data.maingroups);
    }
  };
  useEffect(() => {
    getAllMainGroupForApp();
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerTitle}>
        <View
          style={{ justifyContent: "center", marginLeft: 20, marginBottom: 5 }}
        >
          <Avatar.Image source={{ uri: data.userAvatar }} />
        </View>
        <View style={styles.title}>
          <Text style={styles.textTitle}>{"Xin chào, Nguyen Huy!"}</Text>
        </View>
      </View>
      <View>
        <View style={styles.searchMargin}>
          <View style={styles.search}>
            <TextInput
              placeholder="Nhập từ khóa để tìm kiếm"
              placeholderTextColor="#C0C0C0"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(val) => textInputChange(val)}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("productSearch", {
                  keyWord: dataSearch.textSearch,
                });
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
            <DeckSwiper
              cards={carouselItems}
              verticalSwipe={false}
              renderCard={(card) => (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    style={{
                      width: 380,
                      height: 200,
                      borderRadius: 10,
                    }}
                    source={{ uri: card.url }}
                  />
                </View>
              )}
              //onSwipedLeft={onSwipeLeft}
              backgroundColor={"transparent"}
              stackSize={3}
              cardIndex={0}
              // useViewOverflow={false}
              infinite={true}
              cardVerticalMargin={20}
              cardVerticalThreshold={10}
              containerStyle={{
                marginTop: -10,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 25,
              marginTop: 250,
              zIndex: 2,
            }}
          >
            <View style={{ flex: 3, alignItems: "flex-start" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Danh mục nổi bật
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("categoryScreen");
              }}
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ fontSize: 15 }}>Tất cả</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginTop: 10,
              zIndex: 2,
            }}
          >
            <FlatList
              data={mainGroup}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {}}
                    key={index}
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                      marginTop: 5,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Image
                      source={{
                        uri: item.maingroupImagePath
                          ? item.maingroupImagePath
                          : "https://icon-library.com/images/image-icon-png/image-icon-png-6.jpg",
                      }}
                      // source={{
                      //   uri: item.maingroupImagePath,
                      // }}
                      style={{ width: 70, height: 70, borderRadius: 15 }}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        marginTop: 5,
                        width: 85,
                        display: "flex",
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
              flexDirection: "row",
              paddingHorizontal: 25,
              marginTop: 10,
              zIndex: 2,
            }}
          >
            <View style={{ flex: 3, alignItems: "flex-start" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Khuyến mãi
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
              marginLeft: 20,
              marginRight: 20,
              zIndex: 2,
            }}
          >
            <FlatList
              data={FavItems}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <View
                      style={{
                        zIndex: 1,
                        alignItems: "flex-end",
                        marginRight: 10,
                      }}
                    >
                      <FontAwesome
                        style={{
                          zIndex: 2,
                          position: "absolute",
                        }}
                        name="star"
                        size={72}
                        color="#FF0"
                      />
                      <FontAwesome
                        style={{
                          zIndex: 3,
                          position: "absolute",
                        }}
                        name="star"
                        size={70}
                        color="#FF0000"
                      />
                      <Text
                        style={{
                          zIndex: 4,
                          position: "absolute",
                          marginTop: 25,
                          paddingRight: 15,
                          color: "#FF0",
                        }}
                      >
                        -50%
                      </Text>
                    </View>
                    <Card
                      key={index}
                      containerStyle={{ borderRadius: 10, marginLeft: 1 }}
                    >
                      <View>
                        <Image
                          source={{
                            uri: item.url,
                          }}
                          style={{ width: 170, height: 150, borderRadius: 10 }}
                        />
                      </View>
                      <Card.Title style={{ fontSize: 18, marginTop: 10 }}>
                        {item.name}
                      </Card.Title>

                      <View
                        style={{
                          flexDirection: "row",

                          alignItems: "center",
                        }}
                      >
                        <Entypo name="price-ribbon" color="#000000" size={20} />
                        <Text
                          style={{
                            fontSize: 15,
                            marginRight: 2,
                            textDecorationLine: "line-through",
                          }}
                        >
                          {item.price + "đ"}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: 5,
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Entypo
                              name="price-ribbon"
                              color="#FF0000"
                              size={20}
                            />
                            <Text
                              style={{
                                marginLeft: 2,
                                fontSize: 22,
                                color: "#FF0000",
                              }}
                            >
                              {item.priceEdit + "đ"}
                            </Text>
                          </View>
                          <Text style={{ fontStyle: "italic" }}>
                            Còn lại: 121
                          </Text>
                        </View>
                        <TouchableOpacity onPress={() => setIsVisible(true)}>
                          <View
                            style={{
                              backgroundColor: "#FF0000",
                              marginRight: 5,
                              width: 45,
                              height: 45,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 5,
                            }}
                          >
                            <Feather
                              name="shopping-cart"
                              color="#ffffff"
                              size={30}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </Card>
                  </View>
                );
              }}
            />
          </View>

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
              marginLeft: 5,
              marginRight: 5,
              zIndex: 2,
            }}
          >
            {FavItems.map((item, index) => {
              return (
                <View key={index}>
                  <Card containerStyle={{ borderRadius: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 2 }}>
                        <Image
                          source={{
                            uri: item.url,
                          }}
                          style={{ width: 100, height: 100, borderRadius: 10 }}
                        />
                      </View>
                      <View style={{ flex: 3 }}>
                        <View style={{ padding: 5 }}>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            {item.name}
                          </Text>
                          <Text style={{ fontStyle: "italic" }}>
                            Còn lại: 12
                          </Text>
                        </View>
                        <View
                          style={{
                            padding: 5,
                            flexDirection: "row",
                            alignItems: "flex-end",
                          }}
                        >
                          <Text>Giá:</Text>
                          <Text style={{ fontSize: 18, color: "#FF0000" }}>
                            {item.price + "đ"}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => setIsVisible(true)}
                          style={{
                            backgroundColor: "#FF0000",
                            marginRight: 5,
                            width: 45,
                            height: 45,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 5,
                          }}
                        >
                          <Feather
                            name="shopping-cart"
                            color="#ffffff"
                            size={25}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card>
                </View>
              );
            })}
          </View>
          <View style={styles.container}>
            <Modal
              isVisible={isVisible}
              onSwipeComplete={() => {
                setIsVisible(false);
                setSelected({});
                setQuantity(1);
              }}
              swipeDirection={["down"]}
              style={styles.modal}
            >
              <KeyboardAvoidingView behavior="padding">
                <View style={styles.bottomSheet}>
                  <View style={styles.paddingHandle}>
                    <View style={styles.handle} />
                  </View>
                  <View
                    style={{
                      height: 120,
                      backgroundColor: "#ffffff",
                      marginTop: 1,
                    }}
                  >
                    <Text>Huy</Text>
                  </View>

                  <View
                    style={{
                      padding: 10,
                      backgroundColor: "#ffffff",
                      marginTop: 1,
                      justifyContent: "center",
                    }}
                  >
                    {varriant.map((item, indexOption) => (
                      <View key={item.group}>
                        <View>
                          <Text>{item.name}</Text>
                          <View
                            style={{ flexDirection: "row", flexWrap: "wrap" }}
                          >
                            {item.value.map((itemValue, indexValue) => (
                              <View
                                key={itemValue.valueId}
                                style={{ padding: 5 }}
                              >
                                <Chip
                                  key={itemValue.valueId}
                                  style={{ paddingHorizontal: 15 }}
                                  selected={
                                    selected[item.group] === itemValue.valueId
                                  }
                                  onPress={() =>
                                    //console.log(item.group, itemValue.valueId)
                                    {
                                      handleSelect(
                                        item.group,
                                        itemValue.valueId
                                      );
                                    }
                                  }
                                >
                                  {itemValue.valueName}
                                </Chip>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View
                    style={{
                      padding: 10,
                      marginTop: 1,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <View>
                      <Text>Chọn số lượng</Text>
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
                        totalWidth={100}
                        totalHeight={30}
                        minValue={1}
                        step={1}
                        valueType="real"
                        rounded
                        textColor="#000000"
                        iconStyle={{ color: "white" }}
                        rightButtonBackgroundColor="#ff0000"
                        leftButtonBackgroundColor="#ff0000"
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      padding: 10,
                      marginTop: 1,
                      backgroundColor: "#ffffff",
                      marginBottom: 20,
                    }}
                  >
                    <TouchableOpacity
                      onPress={addToCart}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 15,
                        backgroundColor: "#ff0000",
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
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
