import axios from "axios";

const API_BASE_URL = "http://localhost:5001/ebuddy-test/us-central1/api/api";

const getToken = () => localStorage.getItem("token");

export const fetchUserData = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/get-user/1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const updateUserData = async (data: {
  userId: string;
  username: string;
}) => {
  try {
    const token = getToken();
    const response = await axios.put(`${API_BASE_URL}/update-user`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user data");
  }
};
