import API from "../../../config/api";
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

export const authSignupApi = async (
  username,
  password,
  firstname,
  lastname,
  phoneNumber,
  email,
  gender
) => {
  try {
    const response = await API.post(
      "auth/sign-up",
      {
        data: {
          username: username,
          password: password,
          sysUserDescription: null,
          isActived: 1,
          roleId: 1,
          userInformation: {
            firstname: firstname,
            lastname: lastname,
            phoneNumber: phoneNumber,
            email: email,
            birthday: null,
            gender: gender,
            provinceId: null,
            districtId: null,
            wardId: null,
            address: null,
            description: null,
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
