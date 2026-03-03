"use client";
import { createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const fetchAllEnrolment = createAsyncThunk(
  "student/fetchAllEnrolment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/enrolment/get`);
      const enrolments = response?.data?.enrolments || [];

      localStorage.setItem(
        "allEnrolments",
        JSON.stringify(enrolments)
      );
      console.log("Fetched enrolments:", enrolments);
      return enrolments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const getInitialEnrolments = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("allEnrolments");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const enrolmentSlice = createSlice({
  name: "enrolment",
  initialState: {
    enrolments: getInitialEnrolments(),
    loading: true,
    error: null,
  },


  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEnrolment.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllEnrolment.fulfilled, (state, action) => {
        state.loading = false;
        state.enrolments = action.payload;
      })
      .addCase(fetchAllEnrolment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default enrolmentSlice.reducer;