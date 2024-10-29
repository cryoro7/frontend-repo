import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5001/ebuddy-test/us-central1/api/api";

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (payload: { uid: string; data: any }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      const response = await axios.put(
        `${API_BASE_URL}/update-user`,
        {
          userId: payload.uid,
          ...payload.data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? error.message ?? "Unknown error"
      );
    }
  }
);
