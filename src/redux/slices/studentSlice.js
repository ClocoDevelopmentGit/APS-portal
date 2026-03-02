"use client";
import { createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const fetchStudentById = createAsyncThunk(
  "student/fetchStudentById",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/user/get/${studentId}`
      );
      console.log(response.data);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const studentSlice = createSlice({
  name: "student",
  initialState: {
    selectedStudent: null,
    studentDetails: null,
    loading: true,
    error: null,
  },

  reducers: {
    setSelectedStudent: (state, action) => {
      console.log(action.payload);
      state.selectedStudent = action.payload;
    },
    clearSelectedStudent: (state) => {
      state.selectedStudent = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.studentDetails = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedStudent, clearSelectedStudent } =
  studentSlice.actions;

export default studentSlice.reducer;