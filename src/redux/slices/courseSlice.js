import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9000";

export const fetchAllCourses = createAsyncThunk(
  "course/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/course/get`);
      localStorage.setItem(
        "allCourses",
        JSON.stringify(response?.data?.course)
      );
      return response?.data?.course;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch courses";
      return rejectWithValue(message);
    }
  }
);

export const fetchCourseId = createAsyncThunk(
  "course/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Course ID is required for fetching");
      }
      const response = await axios.get(`${API_URL}/api/course/get/${id}`);
      localStorage.setItem(
        "courseById",
        JSON.stringify(response?.data?.course)
      );
      return response?.data?.course;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch courses";
      return rejectWithValue(message);
    }
  }
);

export const createCourse = createAsyncThunk(
  "course/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/course/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response?.data?.course;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create course"
      );
    }
  }
);

export const updateCourse = createAsyncThunk(
  "course/update",
  async (id, formData, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Course ID is required for update");
      }
      const response = await axios.put(
        `${API_URL}/api/course/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response?.data?.course;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create course"
      );
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "course/delete",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Course ID is required for delete");
      }
      await axios.delete(`${API_URL}/api/course/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create course"
      );
    }
  }
);

export const fetchAllClasses = createAsyncThunk(
  "course/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/course/get`);
      localStorage.setItem("allClasses", JSON.stringify(response?.data?.class));
      return response?.data?.class;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch classes";
      return rejectWithValue(message);
    }
  }
);

export const fetchClassId = createAsyncThunk(
  "class/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Class ID is required for fetching");
      }
      const response = await axios.get(`${API_URL}/api/class/get/${id}`);
      localStorage.setItem("classById", JSON.stringify(response?.data?.class));
      return response?.data?.class;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch classes";
      return rejectWithValue(message);
    }
  }
);

export const createClass = createAsyncThunk(
  "class/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/class/add`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response?.data?.class;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create course"
      );
    }
  }
);

export const updateClass = createAsyncThunk(
  "class/update",
  async (id, data, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Class ID is required for update");
      }
      const response = await axios.put(
        `${API_URL}/api/class/update/${id}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data.class;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create course"
      );
    }
  }
);

export const deleteClass = createAsyncThunk(
  "class/delete",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Class ID is required for delete");
      }
      await axios.delete(`${API_URL}/api/class/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create course"
      );
    }
  }
);

const getInitialCourses = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("allCourses");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const getInitialCourse = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("courseById");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: getInitialCourses(),
    course: getInitialCourse(),
    loading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCourseId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourseId.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload;
      })
      .addCase(fetchCourseId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.unshift(action.payload);
        localStorage.setItem("allCourses", JSON.stringify(state.courses));
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.courses.findIndex((c) => c.id === updated.id);
        if (index !== -1) {
          state.courses[index] = updated;
        }
        localStorage.setItem("allCourses", JSON.stringify(state.courses));
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.courses.classes) {
          state.courses.classes = [];
        }
        state.courses.classes.unshift(action.payload);
      })
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        const updatedClass = action.payload;
        state.courses.classes = state.courses.classes.map((cls) =>
          cls.id === updatedClass.id ? updatedClass : cls
        );
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.courses.classes = state.courses.classes.filter(
          (cls) => cls.id !== deletedId
        );
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
