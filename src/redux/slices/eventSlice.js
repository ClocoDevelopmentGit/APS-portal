import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "https://aps-backend.cloco.com.au";
// const API_URL = "http://localhost:9000";

export const fetchAllEvents = createAsyncThunk(
  "event/fetchAll",
  async (paramsObj = {}, { rejectWithValue }) => {
    try {
      const { filters = {}, length = 0 } = paramsObj;
      const response = await axios.get(`${API_URL}/api/event/get`, {
        params: filters,
      });
      const events = response?.data?.events || [];

      localStorage.setItem("allEvents", JSON.stringify(events));

      return {
        isFiltered: length > 0,
        events,
      };
    } catch (error) {
      console.error("Error fetching events:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch events";
      return rejectWithValue(message);
    }
  }
);

export const fetchEventId = createAsyncThunk(
  "event/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Event ID is required for fetching");
      }
      const response = await axios.get(`${API_URL}/api/event/get/${id}`);
      localStorage.setItem("eventById", JSON.stringify(response?.data?.event));
      return response?.data?.event;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch events";
      return rejectWithValue(message);
    }
  }
);

export const createEvent = createAsyncThunk(
  "event/create",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/event/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response?.data?.event;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create event"
      );
    }
  }
);

export const updateEvent = createAsyncThunk(
  "event/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Event ID is required for update");
      }
      const response = await axios.put(
        `${API_URL}/api/event/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response?.data?.event;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create event"
      );
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "event/delete",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Event ID is required for delete");
      }
      await axios.delete(`${API_URL}/api/event/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create event"
      );
    }
  }
);
const getInitialEvents = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("allEvents");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const getInitialEvent = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("eventById");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: getInitialEvents(),
    filteredEvents: getInitialEvents(),
    event: getInitialEvent(),
    loading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredEvents = action.payload.events;
        if (!action.payload.isFiltered) {
          state.events = action.payload.events;
        }
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEventId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventId.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(fetchEventId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.unshift(action.payload);
        state.filteredEvents.unshift(action.payload);
        localStorage.setItem("allEvents", JSON.stringify(state.events));
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const mainIndex = state.events.findIndex((c) => c.id === updated.id);
        if (mainIndex !== -1) {
          state.events[mainIndex] = updated;
        }
        const filteredIndex = state.filteredEvents.findIndex(
          (c) => c.id === updated.id
        );
        if (filteredIndex !== -1) {
          state.filteredEvents[filteredIndex] = updated;
        }
        localStorage.setItem("allEvents", JSON.stringify(state.events));
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter((c) => c.id !== action.payload);
        state.filteredEvents = state.filteredEvents.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
