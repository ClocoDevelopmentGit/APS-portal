import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const fetchAllLocations = createAsyncThunk(
  "location/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/location/get`);
      localStorage.setItem(
        "allLocations",
        JSON.stringify(response?.data?.locations)
      );
      return response?.data?.locations;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch categories";
      return rejectWithValue(message);
    }
  }
);

export const fetchLocationId = createAsyncThunk(
  "location/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Location ID is required for fetching");
      }
      const response = await axios.get(`${API_URL}/api/location/get/${id}`);
      localStorage.setItem(
        "locationById",
        JSON.stringify(response?.data?.location)
      );
      return response?.data?.location;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch categories";
      return rejectWithValue(message);
    }
  }
);

export const createLocation = createAsyncThunk(
  "location/create",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/location/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response?.data?.location;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create location"
      );
    }
  }
);

export const updateLocation = createAsyncThunk(
  "location/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Location ID is required for update");
      }
      const response = await axios.put(
        `${API_URL}/api/location/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response?.data?.location;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create location"
      );
    }
  }
);

export const deleteLocation = createAsyncThunk(
  "location/delete",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Location ID is required for delete");
      }
      await axios.delete(`${API_URL}/api/location/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create location"
      );
    }
  }
);

const getInitialLocations = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("allLocations");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const getInitialLocation = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("locationById");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locations: getInitialLocations(),
    location: getInitialLocation(),
    loading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLocations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLocationId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLocationId.fulfilled, (state, action) => {
        state.loading = false;
        state.location = action.payload;
      })
      .addCase(fetchLocationId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.unshift(action.payload);
        localStorage.setItem("allLocations", JSON.stringify(state.categories));
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.categories.findIndex((c) => c.id === updated.id);
        if (index !== -1) {
          state.categories[index] = updated;
        }
        localStorage.setItem("allLocations", JSON.stringify(state.categories));
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default locationSlice.reducer;
