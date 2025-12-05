import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://aps-backend.cloco.com.au";

export const fetchAllStaffs = createAsyncThunk(
  "user/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/user/get`);
      const staffs = response?.data?.users.filter(
        (user) => user.role === "Staff"
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
  }
);

export const fetchCategoryId = createAsyncThunk(
  "user/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Category ID is required for fetching");
      }
      const response = await axios.get(`${API_URL}/api/user/get/${id}`);
      localStorage.setItem("userById", JSON.stringify(response?.data?.user));
      return response?.data?.user;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch users";
      return rejectWithValue(message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "user/create",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response?.data?.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "user/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Category ID is required for update");
      }
      const response = await axios.put(
        `${API_URL}/api/user/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response?.data?.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "user/delete",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Category ID is required for delete");
      }
      await axios.delete(`${API_URL}/api/user/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
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
    const saved = localStorage.getItem("userById");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
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
        state.users = action.payload;
      })
      .addCase(fetchAllStaffs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategoryId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.users.unshift(action.payload);
        localStorage.setItem("allUsers", JSON.stringify(state.users));
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.users.findIndex((c) => c.id === updated.id);
        if (index !== -1) {
          state.users[index] = updated;
        }
        localStorage.setItem("allUsers", JSON.stringify(state.users));
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
