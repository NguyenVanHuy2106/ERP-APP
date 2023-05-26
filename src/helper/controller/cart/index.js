import API from "../../config/api";

export const getSuggestBySubgroupList = async (userLogin) => {
  try {
    const response = await API.post(
      "model/app/get-model-by-subgroup-list-for-cart",
      {
        userLogin: userLogin,
        data: {
          storeId: 1,
          inventoryStatusId: 1,
          isActive: 1,
          limit: 300,
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

export const addToCart = async (
  userLogIn,
  modelId,
  productId,
  subgroupId,
  brandId,
  quantity,
  inventoryStatusId
) => {
  try {
    const response = await API.post(
      "cart/app/add-to-cart",
      {
        userLogIn: userLogIn,
        data: {
          cartList: [
            {
              modelId: modelId,
              productId: productId,
              subgroupId: subgroupId,
              brandId: brandId,
              quantity: quantity,
              inventoryStatusId: inventoryStatusId,
              storeId: 1,
            },
          ],
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

export const getCartItemsAPI = async (customerId) => {
  try {
    const response = await API.post(
      "cart/app/get-by-cutomerid",
      {
        userLogIn: customerId,
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
export const deleteCartItems = async (customerId, cartcustomerId, quantity) => {
  try {
    const response = await API.post(
      "cart/app/update-cart",
      {
        userLogIn: customerId,
        data: {
          cartItem: {
            cartcustomerId: cartcustomerId,
            quantity: quantity,
            isDeleted: 1,
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
    return err;
  }
};
