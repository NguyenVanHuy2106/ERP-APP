import API from "../../config/api";

export const getModelByMainGroup = async (
  mainGroupId,
  subgroupId,
  brandId,
  limit
) => {
  try {
    // console.log(mainGroupId, subgroupId, brandId);
    const response = await API.post(
      "model/app/get-model-by-attribute",
      {
        userLogin: null,
        data: {
          maingroupId: mainGroupId,
          subgroupId: subgroupId,
          brandId: brandId,
          storeId: 1,
          isActive: 1,
          limit: limit,
          offset: 0,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response.data);
    return response;
  } catch (err) {
    return err;
  }
};
export const getModelByKeyWord = async (keyword) => {
  try {
    // console.log(mainGroupId, subgroupId, brandId);
    const response = await API.post(
      "model/app/search-model-by-keyword",
      {
        data: {
          keyword: keyword,
          isActived: 1,
          storeId: 1,
          limit: 20,
          offset: 0,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response.data);
    return response;
  } catch (err) {
    return err;
  }
};

export const getModelInfoAPI = async (modelId) => {
  try {
    const response = await API.post(
      "model/general/get-model-detail",
      {
        userLogin: null,
        data: {
          modelId: modelId,
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

export const getProductIdByVarrant = async (
  modelId,
  varantProductAttributeList
) => {
  try {
    //console.log(modelId, varantProductAttributeList);
    const response = await API.post(
      "model/general/get-productid-by-varant",
      {
        userLogin: null,
        data: {
          modelId: modelId,
          storeId: 1,
          VarantProductAttributeList: varantProductAttributeList,
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
