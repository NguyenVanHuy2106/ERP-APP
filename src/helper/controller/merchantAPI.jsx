import API from "../config/api";
export const getMerchantFoodCat = async (userData) => {
  try {
    const response = await API.get("merchant/foodcategory/", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const updateMerchantFoodCat = async (userData, item, show) => {
  try {
    const response = await API.post(
      `merchant/foodcategory/update/${item.id}`,
      { isShowing: show },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userData.accessToken,
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getMerchantProductCat = async (userData) => {
  try {
    const response = await API.get("merchant/productcategory/", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const getMerchantProduct = async (userData, item) => {
  try {
    const response = await API.get(`merchant/products/category/${item.id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    //console.log(response.status);
    return response;
  } catch (err) {
    return err;
  }
};

export const updateMerchantProduct = async (userData, item, isSelling) => {
  try {
    const response = await API.post(
      `merchant/products/update/${item.id}`,
      { isSelling: isSelling },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userData.accessToken,
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const updateMerchantProductCat = async (userData, item, show) => {
  try {
    const response = await API.post(
      `merchant/productcategory/update/${item.id}`,
      { isShowing: show },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userData.accessToken,
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const addNewProductCat = async (userData, catName, isShowing) => {
  //console.log(data);
  try {
    const response = await API.post(
      "merchant/productcategory/addnew/",
      { catName: catName, isShowing: isShowing },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userData.accessToken,
        },
      }
    );
    return response;
    //console.log(response.data);
  } catch (err) {
    return err;
  }
};

//Order

export const getUserMerchantOrder = async (userData) => {
  try {
    const response = await API.get(`merchant/order`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    //console.log(response.status);
    return response;
  } catch (err) {
    return err;
  }
};
