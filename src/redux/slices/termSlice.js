import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const fetchAllTerms = createAsyncThunk(
  "term/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/term/get`);
      localStorage.setItem("allTerms", JSON.stringify(response?.data?.terms));
      return response?.data?.terms;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch Terms";
      return rejectWithValue(message);
    }
  }
);

export const fetchTermId = createAsyncThunk(
  "term/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Term ID is required for fetching");
      }
      const response = await axios.get(`${API_URL}/api/term/get/${id}`);
      localStorage.setItem("termById", JSON.stringify(response?.data?.term));
      return response?.data?.term;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch Terms";
      return rejectWithValue(message);
    }
  }
);

export const createTerm = createAsyncThunk(
  "term/create",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/term/add`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      return response?.data?.term;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create term"
      );
    }
  }
);

export const updateTerm = createAsyncThunk(
  "term/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Term ID is required for update");
      }
      const response = await axios.put(
        `${API_URL}/api/term/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response?.data?.term;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create term"
      );
    }
  }
);

export const deleteTerm = createAsyncThunk(
  "term/delete",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Term ID is required for delete");
      }
      await axios.delete(`${API_URL}/api/term/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create term"
      );
    }
  }
);

const getInitialTerms = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("allTerms" || []);
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const getInitialTerm = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("termById");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const termSlice = createSlice({
  name: "term",
  initialState: {
    terms: getInitialTerms(),
    term: getInitialTerm(),
    loading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTerms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTerms.fulfilled, (state, action) => {
        state.loading = false;
        state.terms = action.payload;
      })
      .addCase(fetchAllTerms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTermId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTermId.fulfilled, (state, action) => {
        state.loading = false;
        state.term = action.payload;
      })
      .addCase(fetchTermId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTerm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTerm.fulfilled, (state, action) => {
        state.loading = false;
        state.terms.unshift(action.payload);
        localStorage.setItem("allTerms", JSON.stringify(state.terms));
      })
      .addCase(createTerm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTerm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTerm.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.terms.findIndex((c) => c.id === updated.id);
        if (index !== -1) {
          state.terms[index] = updated;
        }
        localStorage.setItem("allTerms", JSON.stringify(state.terms));
      })
      .addCase(updateTerm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTerm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTerm.fulfilled, (state, action) => {
        state.loading = false;
        state.terms = state.terms.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteTerm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default termSlice.reducer;
