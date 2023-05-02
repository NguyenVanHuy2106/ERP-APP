import API from "../../config/api";

export const getAllMainGroup = async () => {
  try {
    const response = await API.get("app/maingroup/getAll", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
