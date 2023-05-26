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
  TextInput,
  FlatList,
  Modal,
  Switch,
  ActivityIndicator,
  Alert,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Card } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import ModalSelector from "react-native-modal-selector";
import {
  getAllProvince,
  getDistrictByProvince,
  getWardByDistrict,
  addNewAddress,
  updateAddressAPI,
} from "../../../helper/controller/address";
export default function UpdateAddress({ navigation, route }) {
  let account = route.params.account;
  const addressInfo = route.params.addressInfo;
  //console.log(addressInfo);
  const [visible, setVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(
    addressInfo.isDefaultAddress == 1 ? true : false
  );
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [selectedProvinceValue, setSelectedProvinceValue] = useState({
    provinceId: addressInfo.provinceId,
    provinceName: addressInfo.provinceName,
  });
  const [selectedDistrictValue, setSelectedDistrictValue] = useState({
    districtId: addressInfo.districtId,
    districtName: addressInfo.districtName,
  });
  const [selectedWardValue, setSelectedWardValue] = useState({
    wardId: addressInfo.wardId,
    wardName: addressInfo.wardName,
  });
  const [address, setAddress] = useState(addressInfo.address);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [name, setName] = useState(addressInfo.contactName);
  const [phoneNumber, setPhoneNumber] = useState(
    addressInfo.contactPhoneNumber
  );
  //console.log(wardList);

  const onSelectProvince = (option) => {
    setSelectedProvinceValue({
      provinceId: option.provinceId,
      provinceName: option.provinceName,
    });
    getDistrict(option.provinceId);
    setSelectedDistrictValue("");
    setSelectedWardValue("");
  };
  const onSelectDistrict = (option) => {
    setSelectedDistrictValue({
      districtId: option.districtId,
      districtName: option.districtName,
    });
    getWard(option.districtId);
    setSelectedWardValue("");
  };
  const onSelectWard = (option) => {
    setSelectedWardValue({
      wardId: option.wardId,
      wardName: option.wardName,
    });
  };
  const getProvince = async () => {
    const result = await getAllProvince();
    if (result.status === 200) {
      setProvinceList(result.data.data.provinces);
    }
  };
  const getDistrict = async (provinceId) => {
    const result = await getDistrictByProvince(provinceId);
    if (result.status === 200) {
      setDistrictList(result.data.data.district);
      //console.log(result.data.data.district);
    }
  };
  const getWard = async (districtId) => {
    const result = await getWardByDistrict(districtId);
    if (result.status === 200) {
      setWardList(result.data.data.ward);
      //console.log(result.data.data.district);
    }
  };
  const handleUpdateAddress = async () => {
    //console.log(account, addressInfo.customerAddressId);
    const dataUpdate = {};
    dataUpdate.provinceId = selectedProvinceValue.provinceId;
    dataUpdate.contactName = name;
    dataUpdate.contactPhoneNumber = phoneNumber;
    dataUpdate.provinceName = selectedProvinceValue.provinceName;
    dataUpdate.districtId = selectedDistrictValue.districtId;
    dataUpdate.districtName = selectedDistrictValue.districtName;
    dataUpdate.wardId = selectedWardValue.wardId;
    dataUpdate.wardName = selectedWardValue.wardName;
    dataUpdate.address = address;
    dataUpdate.isDefaultAddress = isEnabled;
    dataUpdate.isActived = 1;
    //console.log(dataUpdate);
    const result = await updateAddressAPI(
      account,
      addressInfo.customerAddressId,
      dataUpdate
    );
    if (result.status === 200) {
      Alert.alert(
        "Thông báo",
        "Thêm thành công",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    getProvince();
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
        <Text style={styles.returnText}>Chi tiết địa chỉ</Text>
      </View>
      <View>
        <View
          style={{
            paddingTop: 12,
            paddingLeft: 12,
          }}
        >
          <Text style={{ fontSize: 15 }}>Họ và tên:</Text>
        </View>
        <View style={{ paddingHorizontal: 10, paddingTop: 8 }}>
          <TextInput
            placeholder="Nhập họ và tên"
            onChangeText={(value) => setName(value)}
            value={name}
            style={{
              borderWidth: 1,
              height: 50,
              borderRadius: 5,
              borderColor: "#aaaaaa",
              paddingLeft: 10,
            }}
          />
        </View>
        <View
          style={{
            paddingTop: 12,
            paddingLeft: 12,
          }}
        >
          <Text style={{ fontSize: 15 }}>Số điện thoại:</Text>
        </View>
        <View style={{ paddingHorizontal: 10, paddingTop: 8 }}>
          <TextInput
            placeholder="Số điện thoại"
            onChangeText={(value) => setPhoneNumber(value)}
            value={phoneNumber}
            style={{
              borderWidth: 1,
              height: 50,
              borderRadius: 5,
              borderColor: "#aaaaaa",
              paddingLeft: 10,
            }}
          />
        </View>
        <View
          style={{
            paddingTop: 12,
            paddingLeft: 12,
          }}
        >
          <Text style={{ fontSize: 15 }}>Tỉnh,TP:</Text>
        </View>
        <View style={{ paddingTop: 8, paddingHorizontal: 10 }}>
          <ModalSelector
            data={provinceList}
            initValue="--Chọn tỉnh--"
            onChange={onSelectProvince}
            keyExtractor={(item) => item.Id.toString()}
            labelExtractor={(item) => item.provinceName}
            optionContainerStyle={{ maxHeight: "60%" }}
          >
            <Text
              style={{
                height: 50,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "#aaaaaa",
                borderRadius: 5,
                lineHeight: 50,
              }}
            >
              {selectedProvinceValue
                ? selectedProvinceValue.provinceName
                : "--Chọn tỉnh--"}
            </Text>
          </ModalSelector>
        </View>
        <View
          style={{
            paddingTop: 12,
            paddingLeft: 12,
          }}
        >
          <Text style={{ fontSize: 15 }}>Quận, Huyện:</Text>
        </View>
        <View style={{ paddingTop: 8, paddingHorizontal: 10 }}>
          <ModalSelector
            data={districtList}
            initValue="--Chọn quận / huyện--"
            onChange={onSelectDistrict}
            keyExtractor={(item) => item.Id.toString()}
            labelExtractor={(item) => item.districtName}
            optionContainerStyle={{ maxHeight: "60%" }}
          >
            <Text
              style={{
                height: 50,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "#aaaaaa",
                borderRadius: 5,
                lineHeight: 50,
              }}
            >
              {selectedDistrictValue
                ? selectedDistrictValue.districtName
                : "--Chọn quận / huyện--"}
            </Text>
          </ModalSelector>
        </View>
        <View
          style={{
            paddingTop: 12,
            paddingLeft: 12,
          }}
        >
          <Text style={{ fontSize: 15 }}>Phường, Xã:</Text>
        </View>
        <View style={{ paddingHorizontal: 10, paddingTop: 8 }}>
          <ModalSelector
            data={wardList}
            initValue="--Chọn phường / xã--"
            onChange={onSelectWard}
            keyExtractor={(item) => item.Id.toString()}
            labelExtractor={(item) => item.wardName}
            optionContainerStyle={{ maxHeight: "60%" }}
          >
            <Text
              style={{
                height: 50,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "#aaaaaa",
                borderRadius: 5,
                lineHeight: 50,
              }}
            >
              {selectedWardValue
                ? selectedWardValue.wardName
                : "--Chọn phường / xã--"}
            </Text>
          </ModalSelector>
        </View>
        <View
          style={{
            paddingTop: 12,
            paddingLeft: 12,
          }}
        >
          <Text style={{ fontSize: 15 }}>Số nhà, Đường:</Text>
        </View>
        <View style={{ paddingHorizontal: 10, paddingTop: 8 }}>
          <TextInput
            placeholder="Nhập số nhà, đường"
            onChangeText={(value) => setAddress(value)}
            value={address}
            style={{
              borderWidth: 1,
              height: 50,
              borderRadius: 5,
              borderColor: "#aaaaaa",
              paddingLeft: 10,
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15 }}>Đặt làm địa chỉ mặc định </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#ff0000" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View
          style={{
            marginTop: 24,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => handleUpdateAddress()}
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
