import API from "../../../config/api";

export const authSignInApi = async (username, password) => {
  try {
    const response = await API.post(
      "authCustomer/sign-in",
      {
        data: {
          signInData: {
            username: username,
            password: password,
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
