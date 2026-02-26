"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const addPayment = createAsyncThunk(
  "payment/addPayment",
  async (updatedEnrollmentData, { rejectWithValue }) => {
    try {
      const apiResponse = await axios.post(
        `${API_URL}/api/payment/add`,
        updatedEnrollmentData
      );

      if (apiResponse.data.success) {
        return apiResponse.data.response; 
      }

      return rejectWithValue("Payment data insertion failed.");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Payment data insertion failed. Please try again.";

      return rejectWithValue(message);
    }
  }
);

