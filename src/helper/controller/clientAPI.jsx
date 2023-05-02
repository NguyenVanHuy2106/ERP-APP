import API from "../config/api";

export const authApi = async (username, password) => {
  try {
    const response = await API.post(
      "auth/signin",
      { username: username, password: password },
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

export const getInfo = async (userData) => {
  try {
    const response = await API.get(`user/information/${userData.id}`, {
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
export const getOrder = async (userData) => {
  try {
    const response = await API.get(`order/${userData.id}`, {
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
//CLCartScreen
export const getCartItem = async (userData) => {
  try {
    const response = await API.get(`cart/${userData.id}`, {
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

export const addCartItem = async (userData, listItem) => {
  try {
    const response = await API.post(
      `cart/${userData.id}}/addCartItem`,
      {
        listCartItems: listItem,
      },
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

export const addNoteItem = async (userData, listItem) => {
  try {
    const response = await API.post(
      `marketnote/${userData.id}/add/`,
      {
        listMarketNoteItems: listItem,
      },
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
export const getNote = async (userData) => {
  try {
    const response = await API.get(`marketnote/${userData.id}`, {
      headers: {
        // "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteCartItem = async (userData, item) => {
  try {
    const article = { title: "Delete Cart Item" };
    const response = await API.put(
      `cart/${userData.id}/deleteCartItem/${item.id}`,
      article,
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

//FavouriteScreens
export const getFavouriteUserCat = async (userData) => {
  try {
    const response = await API.get(`user/${userData.id}/getFavorite/`, {
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

export const getFavouriteCat = async (userData) => {
  try {
    const response = await API.get("foodcategory/", {
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
//ProductScreen
export const getProductCat = async (userData) => {
  try {
    const response = await API.get("productcategory/", {
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
export const getItemProductCat = async (userData, item) => {
  try {
    const response = await API.get(`products/category/${item.id}`, {
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
