import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export const createUserApi = async (signUpBody) => {
  try {
    const response = await axios.post(`${baseUrl}/user/create`, signUpBody);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const userLoginApi = async (email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/signin`, { email, password });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserDataApi = async (accessToken) => {
  try {
    const response = await axios.get(`${baseUrl}/user/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
