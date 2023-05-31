import API from "../../config/api";

export const createOrderAPI = async (userLogin, saleOrder, saleOrderDetail) => {
  try {
    const response = await API.post(
      "saleorder/add-new-saleorder",
      {
        userLogin: userLogin,
        data: {
          saleOrder: saleOrder,
          saleOrderDetail: saleOrderDetail,
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

export const getOrderDetailAPI = async (items) => {
  try {
    const response = await API.post(
      "saleorder/get-saleorder-detail",
      {
        userLogin: null,
        data: items,
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

export const updateCancelOrderAPI = async (account, saleOrderId) => {
  var saleOrderList = [];
  saleOrderList = [saleOrderId];
  //console.log(saleOrderList);
  try {
    const response = await API.post(
      "saleorder/update-saleorder",
      {
        userLogIn: account,
        data: {
          updateStatus: {
            saleOrderList: saleOrderList,
            isReviewed: null,
            isDelivery: null,
            isOutput: null,
            isIncome: null,
            isDeleted: 1,
            deletedNote: "",
            deletedApp: 2,
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
