import API from "../../config/api";

export const getBannerAPI = async (isPriority, limit) => {
  try {
    const response = await API.post(
      "promotion/get-today-promotion",
      {
        userLogIn: null,
        data: {
          storeId: 1,
          inventoryStatusId: 1,
          isPriority: isPriority,
          limit: limit,
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
