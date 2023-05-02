import API from "../../config/api";

export const getAllAddressByCustomerId = async (customerId) => {
  try {
    const response = await API.post(
      "customer-address/get-all",
      {
        customerId: customerId,
        isActived: 1,
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
export const getAllProvince = async () => {
  try {
    const response = await API.post(
      "provinces/get-all",
      {
        data: {
          keyword: "",
          isActived: 1,
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
export const getDistrictByProvince = async (provinceId) => {
  try {
    const response = await API.post(
      "district/get-all",
      {
        data: {
          provinceId: provinceId,
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
export const getWardByDistrict = async (districtId) => {
  try {
    const response = await API.post(
      "ward/get-all",
      {
        districtId: districtId,
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
export const addNewAddress = async (
  customerId,
  provinceId,
  provinceName,
  districtId,
  districtName,
  wardId,
  wardName,
  address,
  isDefaultAddress
) => {
  try {
    const response = await API.post(
      "customer-address/addNew",
      {
        customerId: customerId,
        data: {
          provinceId: provinceId,
          provinceName: provinceName,
          districtId: districtId,
          districtName: districtName,
          wardId: wardId,
          wardName: wardName,
          address: address,
          isDefaultAddress: isDefaultAddress,
          isActived: 1,
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
