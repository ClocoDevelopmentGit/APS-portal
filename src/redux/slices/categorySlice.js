import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "https://aps-backend.cloco.com.au";
// const API_URL = "http://localhost:9000";

export const fetchAllCategories = createAsyncThunk(
  "category/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/category/get`);
      localStorage.setItem(
        "allCategories",
        JSON.stringify(response?.data?.category)
      );
      return response?.data?.category;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch categories";
      return rejectWithValue(message);
    }
  }
);

export const fetchCategoryId = createAsyncThunk(
  "category/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Category ID is required for fetching");
      }
      const response = await axios.get(`${API_URL}/api/category/get/${id}`);
      localStorage.setItem(
        "categoryById",
        JSON.stringify(response?.data?.category)
      );
      return response?.data?.category;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch categories";
      return rejectWithValue(message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/create",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/category/add`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response?.data?.category;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Category ID is required for update");
      }
      const response = await axios.put(
        `${API_URL}/api/category/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response?.data?.category;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Category ID is required for delete");
      }
      await axios.delete(`${API_URL}/api/category/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

const getInitialCategories = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("allCategories");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const getInitialCategory = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("categoryById");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: getInitialCategories(),
    category: getInitialCategory(),
    loading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategoryId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
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
        state.categories.unshift(action.payload);
        localStorage.setItem("allCategories", JSON.stringify(state.categories));
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
        const index = state.categories.findIndex((c) => c.id === updated.id);
        if (index !== -1) {
          state.categories[index] = updated;
        }
        localStorage.setItem("allCategories", JSON.stringify(state.categories));
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
        state.categories = state.categories.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
