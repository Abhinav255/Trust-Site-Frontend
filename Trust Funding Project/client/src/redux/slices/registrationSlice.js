import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  users: [],
  loading: false,
  error: null,
  success: false, // Add success state to track registration success
};

// Async thunk for registering a new user
export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (userData, { rejectWithValue }) => {
    const { role, ...dataWithoutRole } = userData;
    const endpoint = role === 'trustee' ? '/trustees' : '/donors';
    try {
      const response = await axios.post(`https://trust-site-frontend.onrender.com${endpoint}`, dataWithoutRole);
      return response.data; // Return the response data on success
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// Create the registration slice
const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetRegistrationState: (state) => {
      state.users = [];
      state.loading = false;
      state.error = null;
      state.success = false; // Reset success state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false; // Reset success when a new request is pending
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // Mark success when registration is successful
        state.users.push(action.payload); // Assuming the response contains the new user data
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error from the rejected value
        state.success = false; // Mark success as false on error
      });
  },
});

// Export the actions
export const { clearError, resetRegistrationState } = registrationSlice.actions;

// Export the selector to get users
export const selectUsers = (state) => state.registration.users;

// Export the registration reducer
export default registrationSlice.reducer;
