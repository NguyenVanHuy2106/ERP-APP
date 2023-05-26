import API from "../../config/api";

export const getAllModelFavForCustomer = async (customerId) => {
  try {
    const response = await API.post(
      "customer-fav/get-all",
      {
        data: {
          customerId: customerId,
          isActived: 1,
          inventoryStatusId: 1,
          storeId: 1,
          limit: 40,
          offset: 0,
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

export const updateModelFav = async (customerId, modelId, isActived) => {
  try {
    const response = await API.post(
      "customer-fav/add-update",
      {
        data: {
          customerId: customerId,
          modelId: modelId,
          isActived: isActived,
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
