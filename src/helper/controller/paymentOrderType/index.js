import API from "../../config/api";

export const getAllPaymentOrderType = async () => {
  try {
    const response = await API.get("paymentOrderType/get-all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
