import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Animated,
  Modal,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import {
  getAccountInfoAPI,
  updateCusInfo,
} from "../../helper/controller/profile";
// import { storage } from "../../helper/config/firebaseConfig";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import ModalSelector from "react-native-modal-selector";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  getProvinceAPI,
  getDistrictAPI,
  getWardAPI,
} from "../../helper/controller/GHN";
import {
  getAllProvince,
  getDistrictByProvince,
  getWardByDistrict,
  addNewAddress,
} from "../../helper/controller/address";
export default function ProfileEdit({ navigation, route }) {
  const isFocused = useIsFocused();
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [acountInfo, setAccountInfo] = useState({});
  const [visible, setVisible] = useState(false);
  const account = route.params.account;
  const [show, setShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const [dataUpdate, setDataUpdate] = React.useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    birthday: null,
    gender: null,
    provinceId: null,
    provinceName: "",
    districtId: null,
    districtName: "",
    wardId: null,
    wardName: "",
    address: "",
    avatar: "",
    isActived: 1,
    isDeleted: 0,
  });
  const [selectedProvinceValue, setSelectedProvinceValue] = useState("");
  const [selectedDistrictValue, setSelectedDistrictValue] = useState("");
  const [selectedWardValue, setSelectedWardValue] = useState("");
  const [selectedGenderValue, setSelectedGenderValue] = useState("");
  const [address, setAddress] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  // const formattedDate = selectedDate
  //   ? selectedDate.toLocaleDateString("en-US")
  //   : "Nhập ngày sinh";
  // const formattedDate = selectedDate.toISOString().slice(0, 10);

  const textInputChangefirstName = (val) => {
    setDataUpdate({
      ...dataUpdate,
      firstName: val,
    });
  };
  const textInputChangeLastName = (val) => {
    setDataUpdate({
      ...dataUpdate,
      lastName: val,
    });
  };
  const textInputChangePhoneNumber = (val) => {
    setDataUpdate({
      ...dataUpdate,
      phoneNumber: val,
    });
  };
  const textInputChangeEmail = (val) => {
    setDataUpdate({
      ...dataUpdate,
      email: val,
    });
  };
  const textInputChangeBirthday = (val) => {
    dataUpdate({
      ...dataUpdate,
      birthday: val,
    });
  };
  const textInputChangeGender = (val) => {
    dataUpdate({
      ...dataUpdate,
      gender: val,
    });
  };
  const textInputChangeProvince = (val) => {
    dataUpdate({
      ...dataUpdate,
      provinceId: val,
    });
  };
  const textInputChangeDistrict = (val) => {
    dataUpdate({
      ...dataUpdate,
      districtId: val,
    });
  };
  const textInputChangeWard = (val) => {
    dataUpdate({
      ...dataUpdate,
      wardId: val,
    });
  };
  // const textInputChangeAddress = (val) => {
  //   dataUpdate({
  //     ...dataUpdate,
  //     address: val,
  //   });
  // };
  const textInputChangeAddress = (val) => {
    setDataUpdate({
      ...dataUpdate,
      address: val,
    });
  };
  const textInputChangeAvatar = (val) => {
    dataUpdate({
      ...dataUpdate,
      avatar: val,
    });
  };

  const onSelectProvince = (option) => {
    setSelectedProvinceValue({
      provinceId: option.provinceId,
      provinceName: option.provinceName,
    });
    getDistrictList(option.provinceId);
    setSelectedDistrictValue("");
    setSelectedWardValue("");
  };
  const onSelectDistrict = (option) => {
    setSelectedDistrictValue({
      districtId: option.districtId,
      districtName: option.districtName,
    });
    getWardList(option.districtId);
    setSelectedWardValue("");
  };
  const onSelectWard = (option) => {
    setSelectedWardValue({
      wardId: option.wardId,
      wardName: option.wardName,
    });
  };
  const onSelectGender = (option) => {
    setSelectedGenderValue({
      genderId: option.value,
      label: option.label,
    });
    //console.log(option.value);
  };
  const getAccountInfo = async (accountId) => {
    let labelValue = "";

    const result = await getAccountInfoAPI(accountId);

    if (result.status == 200) {
      setAccountInfo(result.data.data.customers.md_customer_info);
      setSelectedProvinceValue({
        provinceId: result.data.data.customers.md_customer_info.provinceId,
        provinceName: result.data.data.customers.md_customer_info.provinceName,
      });
      getDistrictList(result.data.data.customers.md_customer_info.provinceId);
      setSelectedDistrictValue({
        districtId: result.data.data.customers.md_customer_info.districtId,
        districtName: result.data.data.customers.md_customer_info.districtName,
      });
      getWardList(result.data.data.customers.md_customer_info.districtId);
      setSelectedWardValue({
        wardId: result.data.data.customers.md_customer_info.wardId,
        wardName: result.data.data.customers.md_customer_info.wardName,
      });
      switch (result.data.data.customers.md_customer_info.gender) {
        case 0:
          labelValue = "Nữ";
          break;
        case 1:
          labelValue = "Nam";
          break;
        case 2:
          labelValue = "Khác";
          break;
      }
      setSelectedGenderValue({
        genderId: result.data.data.customers.md_customer_info.gender,
        label: labelValue,
      });
      setSelectedDate(result.data.data.customers.md_customer_info.birthday);
      setDataUpdate({
        firstName: result.data.data.customers.md_customer_info.firstname,
        lastName: result.data.data.customers.md_customer_info.lastname,
        phoneNumber: result.data.data.customers.md_customer_info.phoneNumber,
        email: result.data.data.customers.md_customer_info.email,
        address: result.data.data.customers.md_customer_info.address,
      });
    }
  };
  const getProvinceList = async () => {
    const result = await getAllProvince();
    if (result.status == 200) {
      setProvinceList(result.data.data.provinces);
    }
  };
  const getDistrictList = async (provinceId) => {
    const result = await getDistrictByProvince(provinceId);
    if (result.status === 200) {
      setDistrictList(result.data.data.district);
      //console.log(result.data.data.district);
    }
  };
  const getWardList = async (districtId) => {
    const result = await getWardByDistrict(districtId);
    if (result.status === 200) {
      setWardList(result.data.data.ward);
    }
  };

  const handleUpdate = async () => {
    setVisible(true);
    // console.log(
    //   account,
    //   dataUpdate.firstName,
    //   dataUpdate.lastName,
    //   dataUpdate.phoneNumber,
    //   dataUpdate.email,
    //   selectedDate,
    //   selectedGenderValue.value,
    //   selectedProvinceValue.provinceId,
    //   selectedProvinceValue.provinceName,
    //   selectedDistrictValue.districtId,
    //   selectedDistrictValue.districtName,
    //   selectedWardValue.wardId,
    //   selectedWardValue.wardName,
    //   dataUpdate.address
    // );
    const result = await updateCusInfo(
      account,
      dataUpdate.firstName,
      dataUpdate.lastName,
      dataUpdate.phoneNumber,
      dataUpdate.email,
      new Date(selectedDate).toLocaleDateString("en-US"),
      selectedGenderValue.genderId,
      selectedProvinceValue.provinceId,
      selectedProvinceValue.provinceName,
      selectedDistrictValue.districtId,
      selectedDistrictValue.districtName,
      selectedWardValue.wardId,
      selectedWardValue.wardName,
      dataUpdate.address
    );

    if (result.status === 200) {
      setVisible(false);
      navigation.goBack();
      // Alert.alert("Thông báo", "Cập nhật thông tin thành công");
    }
  };
  useEffect(() => {
    getAccountInfo(account);
    getProvinceList();
  }, [isFocused]);
  return (
    <KeyboardAvoidingView behavior="padding">
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
        <Text style={styles.returnText}>Cập nhật thông tin</Text>
      </View>
      <ScrollView
        style={{ height: "93%" }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              borderWidth: 3,
              borderColor: "#ffffff",
            }}
            source={{
              uri: acountInfo.avatar
                ? acountInfo.avatar
                : "https://icon-library.com/images/image-icon-png/image-icon-png-6.jpg",
            }}
          />
        </View>
        <View style={{ backgroundColor: "#ffffff" }}>
          <View
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, paddingBottom: 12 }}>
              Họ và tên lót
            </Text>
            <TextInput
              placeholder="Nhập họ và tên lót"
              defaultValue={acountInfo.firstname}
              placeholderTextColor="#C0C0C0"
              autoCapitalize="none"
              style={{
                backgroundColor: "#ffffff",
                height: 50,
                paddingLeft: 10,
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: "#777777",
              }}
              onChangeText={(val) => textInputChangefirstName(val)}
            />
          </View>
          <View
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, paddingBottom: 12 }}>Tên</Text>
            <TextInput
              placeholder="Nhập tên"
              defaultValue={acountInfo.lastname}
              placeholderTextColor="#C0C0C0"
              autoCapitalize="none"
              style={{
                backgroundColor: "#ffffff",
                height: 50,
                paddingLeft: 10,
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: "#777777",
              }}
              onChangeText={(val) => textInputChangeLastName(val)}
            />
          </View>
          <View
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, paddingBottom: 12 }}>Giới tính</Text>
            <View>
              <ModalSelector
                data={[
                  { genderId: 0, label: "Nữ" },
                  { genderId: 1, label: "Nam" },
                  { genderId: 2, label: "Khác" },
                ]}
                // defaultValue={acountInfo.provinceId}
                onChange={onSelectGender}
                keyExtractor={(item) => item.genderId.toString()}
                labelExtractor={(item) => item.label}
                optionContainerStyle={{
                  maxHeight: "60%",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 4,
                    borderWidth: 0.5,
                    borderColor: "#777777",
                  }}
                >
                  <Text
                    style={{
                      height: 50,
                      paddingHorizontal: 10,

                      borderColor: "#aaaaaa",
                      borderRadius: 4,
                      lineHeight: 50,
                    }}
                  >
                    {selectedGenderValue
                      ? selectedGenderValue.label
                      : "--Chọn giới tính--"}
                  </Text>
                </View>
              </ModalSelector>
            </View>
          </View>
          <View
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, paddingBottom: 12 }}>Ngày sinh</Text>
            <TextInput
              placeholder="Nhập ngày sinh"
              placeholderTextColor="#C0C0C0"
              autoCapitalize="none"
              value={new Date(selectedDate).toLocaleDateString()}
              style={{
                backgroundColor: "#ffffff",
                height: 50,
                paddingLeft: 10,
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: "#777777",
              }}
              editable={false}
              onPressIn={showDatePicker}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, paddingBottom: 12 }}>
              Số điện thoại
            </Text>
            <TextInput
              placeholder="Nhập số điện thoại"
              defaultValue={acountInfo.phoneNumber}
              placeholderTextColor="#C0C0C0"
              autoCapitalize="none"
              style={{
                backgroundColor: "#ffffff",
                height: 50,
                paddingLeft: 10,
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: "#777777",
              }}
              onChangeText={(val) => textInputChangePhoneNumber(val)}
            />
          </View>
          <View
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, paddingBottom: 12 }}>Email</Text>
            <TextInput
              placeholder="Nhập email"
              defaultValue={acountInfo.email}
              placeholderTextColor="#C0C0C0"
              autoCapitalize="none"
              style={{
                backgroundColor: "#ffffff",
                height: 50,
                paddingLeft: 10,
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: "#777777",
              }}
              onChangeText={(val) => textInputChangeEmail(val)}
            />
          </View>
          {/* <View
            style={{
              marginTop: 16,
              marginLeft: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>Ngày sinh</Text>
            <DateTimePicker
              style={{ marginLeft: 10 }}
              value={dataUpdate.birthday}
              mode="date"
              onChange={(date) => textInputChangeBirthday(date)}
            />
          </View> */}

          <View
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, paddingBottom: 12 }}>Tỉnh/Tp</Text>
            <View>
              <ModalSelector
                data={provinceList}
                // defaultValue={acountInfo.provinceId}
                onChange={onSelectProvince}
                keyExtractor={(item) => item.Id.toString()}
                labelExtractor={(item) => item.provinceName}
                optionContainerStyle={{
                  maxHeight: "60%",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 4,
                    borderWidth: 0.5,
                    borderColor: "#777777",
                  }}
                >
                  <Text
                    style={{
                      height: 50,
                      paddingHorizontal: 10,

                      borderRadius: 4,
                      lineHeight: 50,
                    }}
                  >
                    {selectedProvinceValue
                      ? selectedProvinceValue.provinceName
                      : "--Chọn tỉnh--"}
                  </Text>
                </View>
              </ModalSelector>
            </View>
          </View>
          <View
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, paddingBottom: 12 }}>Quận/Huyện</Text>
            <View>
              <ModalSelector
                data={districtList}
                // defaultValue={acountInfo.provinceId}
                onChange={onSelectDistrict}
                keyExtractor={(item) => item.Id.toString()}
                labelExtractor={(item) => item.districtName}
                optionContainerStyle={{
                  maxHeight: "60%",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 4,
                    borderWidth: 0.5,
                    borderColor: "#777777",
                  }}
                >
                  <Text
                    style={{
                      height: 50,
                      paddingHorizontal: 10,

                      borderColor: "#aaaaaa",
                      borderRadius: 4,
                      lineHeight: 50,
                    }}
                  >
                    {selectedDistrictValue
                      ? selectedDistrictValue.districtName
                      : "--Chọn Quận/Huyện--"}
                  </Text>
                </View>
              </ModalSelector>
            </View>
          </View>
          <View
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, paddingBottom: 12 }}>Phường/Xã</Text>
            <View>
              <ModalSelector
                data={wardList}
                // defaultValue={acountInfo.provinceId}
                onChange={onSelectWard}
                keyExtractor={(item) => item.Id.toString()}
                labelExtractor={(item) => item.wardName}
                optionContainerStyle={{
                  maxHeight: "60%",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 4,
                    borderWidth: 0.5,
                    borderColor: "#777777",
                  }}
                >
                  <Text
                    style={{
                      height: 50,
                      paddingHorizontal: 10,

                      borderColor: "#aaaaaa",
                      borderRadius: 4,
                      lineHeight: 50,
                    }}
                  >
                    {selectedWardValue
                      ? selectedWardValue.wardName
                      : "--Chọn Phường/Xã--"}
                  </Text>
                </View>
              </ModalSelector>
            </View>
          </View>
          <View
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginTop: 12,
              justifyContent: "center",
              paddingBottom: 30,
            }}
          >
            <Text style={{ fontSize: 16, paddingBottom: 12 }}>Địa chỉ</Text>
            <TextInput
              placeholder="Nhập địa chỉ"
              defaultValue={acountInfo.address}
              placeholderTextColor="#C0C0C0"
              autoCapitalize="none"
              style={{
                backgroundColor: "#ffffff",
                height: 50,
                paddingLeft: 10,
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: "#777777",
              }}
              onChangeText={(val) => textInputChangeAddress(val)}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 50,
            }}
          >
            <TouchableOpacity
              onPress={() => handleUpdate()}
              style={{
                paddingHorizontal: 40,
                paddingVertical: 12,
                backgroundColor: "#ff0000",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                {" "}
                Lưu thông tin
              </Text>
            </TouchableOpacity>
          </View>
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
      </ScrollView>
    </KeyboardAvoidingView>
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
