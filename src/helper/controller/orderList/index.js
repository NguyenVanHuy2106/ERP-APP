import API from "../../config/api";

export const getOrderList = async (userLogIn, condition) => {
  try {
    const response = await API.post(
      "saleorder/get-saleorder-list",
      {
        userLogIn: userLogIn,
        data: {
          condition: condition,
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
