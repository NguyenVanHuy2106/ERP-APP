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
    console.log(
      username,
      password,
      firstname,
      lastname,
      phoneNumber,
      email,
      gender
    );
    const response = await API.post(
      "authCustomer/sign-up",
      {
        data: {
          username: username,
          password: password,
          description: "",
          isActived: 1,
          customerInformation: {
            firstname: firstname,
            lastname: lastname,
            phoneNumber: phoneNumber,
            email: email,
            birthday: null,
            gender: gender,
            provinceId: null,
            districtId: null,
            wardId: null,
            address: "",
            description: "",
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
