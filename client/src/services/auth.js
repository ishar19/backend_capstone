import axios from "axios";
export const register = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};
