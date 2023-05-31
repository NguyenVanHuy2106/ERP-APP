import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { RadioButton } from "react-native-paper";
import { style } from "@mui/system";
import DatePicker from "react-native-datepicker";
import { authSignupApi } from "../../../helper/controller/auth/signUp";
export default function SignUp({ navigation }) {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    gender: "",
    confirmPassword: "",
    check_TextInput: false,
    secureTextEntry: true,
  });
  const [selectedValueGender, setSelectedValueGender] = useState(0);
  const [visible, setVisible] = useState(false);
  const toggleModal = () => {
    setVisible(!visible);
  };
  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_TextInput: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_TextInput: false,
      });
    }
  };

  const textInputEmailChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_TextInput: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_TextInput: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirmPassword: val,
    });
  };
  const handleFirstName = (val) => {
    setData({
      ...data,
      firstname: val,
    });
  };
  const handleLastName = (val) => {
    setData({
      ...data,
      lastname: val,
    });
  };
  const handlePhone = (val) => {
    setData({
      ...data,
      phone: val,
    });
  };

  const updatePasswordEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateConfirmPasswordEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const setPickerGender = (val) => {
    setSelectedValueGender(val);
  };

  const signUpButton = async () => {
    setVisible(true);
    if (data.password === data.confirmPassword) {
      const result = await authSignupApi(
        data.username,
        data.password,
        data.firstname,
        data.lastname,
        data.phone,
        data.email,
        selectedValueGender
      );
      // if (result.status == 200) {
      //   toggleModal();
      // }
      // console.log(result);
      if (result.status === 200) {
        setVisible(false);
        Alert.alert("Thông báo", result.data.message);
      } else {
        setVisible(false);
      }
    }
  };

  useEffect(() => {}, []);
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textheader}>Đăng ký</Text>
      </View>
      <ScrollView style={styles.footer}>
        <Text style={styles.textfooter}>Tên tài khoản:</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Nhập tên tài khoản"
            placeholderTextColor="#C0C0C0"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
          {data.check_TextInput ? (
            <Feather name="check-circle" color="#05375a" size={20} />
          ) : null}
        </View>
        <Text style={styles.textfooter}>Họ và tên lót</Text>
        <View style={styles.action}>
          <FontAwesome name="user-circle" color="#05375a" size={20} />
          <TextInput
            placeholder="Nhập họ và tên lót"
            placeholderTextColor="#C0C0C0"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleFirstName(val)}
          />
        </View>
        <Text style={styles.textfooter}>Tên</Text>
        <View style={styles.action}>
          <FontAwesome name="user-circle" color="#05375a" size={20} />
          <TextInput
            placeholder="Nhập tên"
            placeholderTextColor="#C0C0C0"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleLastName(val)}
          />
        </View>
        <Text style={styles.textfooter}>Giới tính</Text>
        <View style={styles.containerPicker}>
          <Picker
            style={styles.picker}
            selectedValue={selectedValueGender}
            itemStyle={{ height: 80 }}
            onValueChange={(itemValue) => setPickerGender(itemValue)}
          >
            <Picker.Item label={"Nam"} value={1} />
            <Picker.Item label={"Nữ"} value={0} />
          </Picker>
        </View>

        <Text style={styles.textfooter}>Số điện thoại</Text>
        <View style={styles.action}>
          <Feather name="phone" color="#05375a" size={20} />
          <TextInput
            placeholder="Nhập số điện thoại"
            placeholderTextColor="#C0C0C0"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePhone(val)}
          />
        </View>

        <Text style={styles.textfooter}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Nhập email"
            placeholderTextColor="#C0C0C0"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputEmailChange(val)}
          />
          {data.check_TextInput ? (
            <Feather name="check-circle" color="#05375a" size={20} />
          ) : null}
        </View>

        <Text style={styles.textfooter}>Mật khẩu</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#C0C0C0"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updatePasswordEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="#05375a" size={20} />
            ) : (
              <Feather name="eye" color="#05375a" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.textfooter}>Nhập lại mật khẩu</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Vui lòng nhập lại mật khẩu"
            placeholderTextColor="#C0C0C0"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleConfirmPasswordChange(val)}
          />
          <TouchableOpacity onPress={updateConfirmPasswordEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="#05375a" size={20} />
            ) : (
              <Feather name="eye" color="#05375a" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={signUpButton}
            style={[
              styles.signIn,
              {
                borderColor: "#ff4700",
                borderWidth: 1,
                marginTop: 0,
              },
            ]}
          >
            <Text style={[styles.textSign, { color: "#ff4700" }]}>Đăng Ký</Text>
          </TouchableOpacity>

          <Text
            style={[styles.textSignIn, { color: "#ff4700" }]}
            onPress={() => navigation.goBack()}
          >
            Bạn đã có tài khoản! Đăng nhập
          </Text>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF4B3A",
  },
  header: {
    marginTop: 100,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  textheader: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  textfooter: {
    color: "#05735a",
    fontSize: 18,
    marginTop: 15,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 100,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textSignIn: {
    fontSize: 15,
    marginTop: 15,
  },
  gender: {
    flexDirection: "row",
    alignItems: "center",
  },
  genderImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  picker: {
    marginLeft: 15,
    marginRight: 15,
  },
});
