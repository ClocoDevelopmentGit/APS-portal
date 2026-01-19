import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const fetchAllStaffs = createAsyncThunk(
  "user/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/user/get`);
      const staffs = response?.data?.users.filter(
        (user) => user.role === "Staff",
      );
      localStorage.setItem("allStaffs", JSON.stringify(staffs));
      return staffs;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch users";
      return rejectWithValue(message);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchById",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/user/me`);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      localStorage.setItem("token", response?.data?.token);
      return response?.data?.user;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch users";
      return rejectWithValue(message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        `${API_URL}/api/user/logout`,
        {},
        { withCredentials: true },
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return null;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      const message =
        error.response?.data?.message ||
        error.message ||
        "Logout failed. Please try again.";
      return rejectWithValue(message);
    }
  },
);

const getInitialUsers = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("allUsers");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const getInitialUser = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("user");
    console.log(saved);
    return saved && saved !== "undefined" ? JSON.parse(saved) : null;
  }
  return null;
};

const getInitialStaffs = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("allStaffs");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    staffs: getInitialStaffs(),
    users: getInitialUsers(),
    user: getInitialUser(),
    loading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStaffs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllStaffs.fulfilled, (state, action) => {
        state.loading = false;
        state.staffs = action.payload;
      })
      .addCase(fetchAllStaffs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
