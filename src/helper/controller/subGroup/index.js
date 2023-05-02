import API from "../../config/api";

export const getSubGroupByMainGroup = async (mainGroupId) => {
  try {
    const response = await API.post(
      "app/subgroup/getByMainGroup",
      { mainGroupId: mainGroupId },
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
export const getAllSubGroup = async () => {
  try {
    const response = await API.get("subgroup/get-all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
