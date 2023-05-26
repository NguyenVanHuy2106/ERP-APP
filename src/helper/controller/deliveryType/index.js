import API from "../../config/api";

export const getAllDelivery = async () => {
  try {
    const response = await API.get("delivery-type/get-all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
