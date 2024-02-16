import axios from 'axios';

const baseUrl = process.env.REACT_APP_TODO_API_URL || '';

export const createUserTaskApi = async (accessToken, newTask) => {
  try {
    const response = await axios.post(`${baseUrl}/task/create`, newTask, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserTasksApi = async (accessToken) => {
  try {
    const response = await axios.get(`${baseUrl}/task/filter`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateUserTaskApi = async (accessToken, taskId, task) => {
  try {
    const response = await axios.patch(`${baseUrl}/task/update/${taskId}`, task, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteUserTaskApi = async (accessToken, taskId) => {
  try {
    const response = await axios.delete(`${baseUrl}/task/delete/${taskId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
