// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, Modal } from "react-native";
// import { WebView } from "react-native-webview";
// import CryptoJS from "crypto-js";
// import moment from "moment";
// import { PayPal } from 'react-native-paypal';
// import { API_CLIENT_ID } from 'react-native-dotenv';

// export default function App() {
//   const [showModal, setShowModal] = useState(false);
//   const [status, setStatus] = useState("Pending");
//   const [paymentUrl, setPaymentUrl] = useState("");

//   const handleResponse = (data) => {
//     if (data.title === "success") {
//       setShowModal(false);
//       setStatus("Complete");
//     } else if (data.title === "cancel") {
//       setShowModal(false);
//       setStatus("Cancelled");
//     } else {
//       return;
//     }
//   };

//   const createVNPayPayment = () => {
//     const vnp_Version = "2.1.0";
//     const vnp_Command = "pay";
//     const vnp_TmnCode = "VNPAY001";
//     const vnp_BankCode = "VIETCOMBANK";
//     const vnp_Locale = "vn";
//     const vnp_CurrCode = "VND";
//     const vnp_TxnRef = "VNPAY123";
//     const vnp_OrderInfo = "Nap 100K cho so dien thoai 0934998386";
//     const vnp_OrderType = "topup";
//     const vnp_Amount = 100000;
//     const vnp_ReturnUrl = "https://merchant.com/return";
//     const vnp_IpAddr = "123.123.123.123";
//     const vnp_CreateDate = moment().format("YYYYMMDDHHmmss");
//     const expireTime = moment().add(10, "minutes");
//     const vnp_ExpireDate = expireTime.format("YYYYMMDDHHmmss");
//     const vnp_Bill_Mobile = "84932224546";
//     const vnp_Bill_Email = "khachhang@vnpay.vn";
//     const vnp_Bill_FirstName = "NGUYEN";
//     const vnp_Bill_LastName = "VAN AN";
//     const vnp_Bill_Address = "P315, 22 Lang Ha";
//     const vnp_Bill_City = "HANOI";
//     const vnp_Bill_Country = "VN";
//     const vnp_Bill_State = "";
//     const vnp_Inv_Phone = "8491234567";
//     const vnp_Inv_Email = "hotro@vnpay.vn";
//     const vnp_Inv_Customer = "NGUYEN VAN A";
//     const vnp_Inv_Address = "22 Láng Hạ, Đống Đa, Hà Nội";
//     const vnp_Inv_Company = "Công ty VNPAY";
//     const vnp_Inv_Taxcode = "20180924080900";
//     const vnp_Inv_Type = "I";
//     const vnp_HashSecret = "UYCEMMXCLDSKMYOJZZKAAMPNHGMZQUWJ";

//     const data = {
//       vnp_Version,
//       vnp_Command,
//       vnp_TmnCode,
//       vnp_BankCode,
//       vnp_Locale,
//       vnp_CurrCode,
//       vnp_TxnRef,
//       vnp_OrderInfo,
//       vnp_OrderType,
//       vnp_Amount,
//       vnp_ReturnUrl,
//       vnp_IpAddr,
//       vnp_CreateDate,
//       vnp_ExpireDate,
//       vnp_Bill_Mobile,
//       vnp_Bill_Email,
//       vnp_Bill_FirstName,
//       vnp_Bill_LastName,
//       vnp_Bill_Address,
//       vnp_Bill_City,
//       vnp_Bill_Country,
//       vnp_Bill_State,
//       vnp_Inv_Phone,
//       vnp_Inv_Email,
//       vnp_Inv_Customer,
//       vnp_Inv_Address,
//       vnp_Inv_Company,
//       vnp_Inv_Taxcode,
//       vnp_Inv_Type,
//     };

//     const secureHash = Object.keys(data)
//       .sort()
//       .reduce((result, key) => {
//         if (data[key] !== "") {
//           result += `&${key}=${data[key]}`;
//         }
//         return result;
//       }, "")
//       .substring(1);

//     const secureHashValue = CryptoJS.HmacSHA512(
//       secureHash,
//       vnp_HashSecret
//     ).toString(CryptoJS.enc.Hex);

//     const paymentUrl = `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?${secureHashValue}`;

//     setPaymentUrl(paymentUrl);
//     console.log(paymentUrl);
//     setShowModal(true);
//   };
//   useEffect(() => {
//     PayPal.initialize(PayPal.SANDBOX, API_CLIENT_ID);
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <TouchableOpacity onPress={createVNPayPayment}>
//         <Text>Create VNPay Payment</Text>
//       </TouchableOpacity>
//       <Modal visible={showModal}>
//         <WebView
//           source={{
//             uri: "https://developer.paypal.com/dashboard/applications/sandbox",
//           }}
//           onNavigationStateChange={(data) =>
//             handleResponse(data.title === undefined ? data : data.title)
//           }
//           injectedJavaScript={`document.f1.submit()`}
//         />
//       </Modal>
//       <Text>Status: {status}</Text>
//     </View>
//   );
// }
