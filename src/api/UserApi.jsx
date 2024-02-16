import axios from 'axios';

const baseUrl = process.env.REACT_APP_TODO_API_URL || '';
const externalApiUrl = process.env.REACT_APP_EXTERNAL_API_ALMA_URL || '';

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

export const recoverPasswordApi = async (email) => {
  try {
    const response = await axios.post(`${externalApiUrl}/auth/send-recover-password-email`, email);

    return response.data;
  } catch (error) {
    return error;
  }
};
