import axios from "axios";
export const getProvinceAPI = async () => {
  try {
    const response = await axios.get(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
      {
        headers: {
          Token: "17fdb6e5-c950-11ed-b09a-9a2a48e971b0",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getDistrictAPI = async (province_id) => {
  try {
    const response = await axios.post(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
      {
        province_id: province_id,
      },
      {
        headers: {
          Token: "17fdb6e5-c950-11ed-b09a-9a2a48e971b0",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getWardAPI = async (district_id) => {
  try {
    const response = await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district_id}`,
      {
        headers: {
          Token: "17fdb6e5-c950-11ed-b09a-9a2a48e971b0",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getDeliveryFeeAPI = async (
  to_district_id,
  to_ward_code,
  height,
  length,
  weight,
  width
) => {
  try {
    const response = await axios.post(
      `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
      {
        from_district_id: 3695,
        from_ward_code: 90756,
        service_type_id: 2,
        to_district_id: to_district_id,
        to_ward_code: to_ward_code,
        height: height,
        length: length,
        weight: weight,
        width: width,
        insurance_value: null,
        cod_failed_amount: null,
        coupon: null,
      },
      {
        headers: {
          Token: "17fdb6e5-c950-11ed-b09a-9a2a48e971b0",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getServiceAPI = async (to_district) => {
  try {
    const response = await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services`,
      {
        shop_id: 3432307,
        from_district: 3695,
        to_district: to_district,
      },
      {
        headers: {
          Token: "17fdb6e5-c950-11ed-b09a-9a2a48e971b0",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};
