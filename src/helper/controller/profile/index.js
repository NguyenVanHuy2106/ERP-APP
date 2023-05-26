import API from "../../config/api";

export const getAccountInfoAPI = async (customerId) => {
  try {
    const response = await API.post(
      "customer/get-by-id",
      {
        data: {
          customerId: customerId,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const updateCusInfo = async (
  customerId,
  firstname,
  lastname,
  phoneNumber,
  email,
  birthday,
  gender,
  provinceId,
  provinceName,
  districtId,
  districtName,
  wardId,
  wardName,
  address
) => {
  try {
    const response = await API.post(
      "customer/update",
      {
        userLogin: customerId,
        data: {
          customerId: customerId,
          updateData: {
            firstname: firstname,
            lastname: lastname,
            phoneNumber: phoneNumber,
            email: email,
            birthday: birthday,
            gender: gender,
            provinceId: provinceId,
            provinceName: provinceName,
            districtId: districtId,
            districtName: districtName,
            wardId: wardId,
            wardName: wardName,
            address: address,
            avatar: "",
            isActived: 1,
            isDeleted: 0,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const countOrder = async (userLogIn) => {
  try {
    const response = await API.post(
      "saleorder/get-saleorder-count",
      {
        userLogIn: userLogIn,
        data: { customerId: userLogIn },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};
