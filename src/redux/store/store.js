import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "../slices/courseSlice";
import categoryReducer from "../slices/categorySlice";
import userReducer from "../slices/userSlice";
import locationReducer from "../slices/locationSlice";
import eventReducer from "../slices/eventSlice";
import termReducer from "../slices/termSlice";
import studentReducer from "../slices/studentSlice";

export const store = configureStore({
  reducer: {
    course: courseReducer,
    category: categoryReducer,
    user: userReducer,
    location: locationReducer,
    event: eventReducer,
    term: termReducer,
    student: studentReducer,
  },
});
