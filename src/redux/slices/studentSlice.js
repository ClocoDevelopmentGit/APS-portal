"use client";
import { createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const fetchAllStudents = createAsyncThunk(
  "student/fetchAllStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/user/students/get`);
      const students = response?.data?.students || [];

      localStorage.setItem(
        "allStudents",
        JSON.stringify(students)
      );
      console.log("Fetched students:", students);
      return students;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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

const getInitialStudents = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("allStudents");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: getInitialStudents(),
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
      .addCase(fetchAllStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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