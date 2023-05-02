import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  Form,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authSignInApi } from "../../../helper/controller/auth/signIn";
import { Message } from "@material-ui/icons";
import { configureStore } from "@reduxjs/toolkit";
export default function SignIn({ navigation }) {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_TextInput: false,
    secureTextEntry: true,
  });
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const toggleModal = () => {
    setVisible(!visible);
  };

  useEffect(() => {}, []);
  const saveAccountToStorage = async (account) => {
    try {
      await AsyncStorage.setItem("account", JSON.stringify(account));
    } catch (error) {}
  };
  const signInButton = async () => {
    if (data.username.length !== 0) {
      if (data.password.length !== 0) {
        try {
          setVisible(true);
          const result = await authSignInApi(data.username, data.password);
          if (result.status == 200) {
            setVisible(false);
            navigation.navigate("dashboardScreen", {
              userData: result.data,
            });
            saveAccountToStorage(result.data.data.userId);
          } else {
            setVisible(false);
            setError("Lỗi đăng nhập");
          }
        } catch (err) {
          alert("Loi");
        }
      } else {
        Alert.alert("Thông báo", "Vui lòng nhập mật khẩu");
      }
    } else {
      Alert.alert("Thông báo", "Vui lòng nhập tên tài khoản");
    }
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
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const updatePasswordEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textheader}>Đăng nhập</Text>
      </View>
      <View style={styles.footer}>
        {error && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="exclamation-triangle"
              size={20}
              color="#FF0000"
            />
            <Text style={{ marginLeft: 10, fontSize: "17", color: "#FF0000" }}>
              {error}
            </Text>
          </View>
        )}
        <Text style={styles.textfooter}>Tên tài khoản</Text>
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
        <Text style={[styles.textfooter, { marginTop: 35 }]}>Mật khẩu</Text>
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

        <View style={styles.button}>
          <TouchableOpacity
            onPress={signInButton}
            style={[
              styles.signIn,
              {
                borderColor: "#ff4700",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text style={[styles.textSign, { color: "#ff4700" }]}>
              Đăng nhập
            </Text>
          </TouchableOpacity>

          <Text
            style={[styles.textSignUp, { color: "#ff4700" }]}
            onPress={() => navigation.navigate("signUpScreen")}
          >
            Bạn chưa có tài khoản! Đăng ký
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
      </View>
    </KeyboardAvoidingView>
  );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor:'#FF4B3A',
//     },
//     header: {
//         flex: 1,
//         justifyContent: "flex-end",
//         paddingHorizontal:20,
//         paddingBottom: 50
//     },
//       footer: {
//         flex: 3,
//         backgroundColor: "#fff",
//         borderTopLeftRadius: 30,
//         borderTopRightRadius:30,
//         paddingVertical: 30,
//         paddingHorizontal:20
//     },
//     textheader: {
//         color: "#fff",
//         fontWeight:'bold',
//         fontSize:30,

//     },
//     textfooter: {
//         color:'#05735a',
//         fontSize: 18
//     },
//     action: {
//         flexDirection: 'row',
//         marginTop: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#f2f2f2',
//         paddingBottom: 5
//     },
//     textInput: {
//         flex: 1,
//         paddingLeft: 10,
//         color: '#05375a',
//     },
//     button: {
//         alignItems: 'center',
//         marginTop: 50
//     },
//     signIn: {
//         width: '100%',
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10
//     },
//     textSign: {
//         fontSize: 18,
//         fontWeight: 'bold'
//     },
//     textSignUp: {
//         fontSize: 15,
//         marginTop: 15
//     }
// });
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#FF4B3A",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
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
  textSignUp: {
    fontSize: 15,
    marginTop: 15,
  },
});
