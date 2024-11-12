import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  superusers: [],
  loading: false,
  error: null,
};

// Async thunk for registering a new superuser
export const registerSuperUser = createAsyncThunk(
  'superusers/registerSuperUser',
  async (superuserData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/superusers', superuserData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// Create the superuser slice
const superuserSlice = createSlice({
  name: 'superusers',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSuperUserState: (state) => {
      state.superusers = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerSuperUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSuperUser.fulfilled, (state, action) => {
        state.loading = false;
        state.superusers.push(action.payload); // Add new superuser
      })
      .addCase(registerSuperUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the actions
export const { clearError, resetSuperUserState } = superuserSlice.actions;

// Export the selector to get superusers
export const selectSuperusers = (state) => state.superusers.superusers;

// Export the superuser reducer
export default superuserSlice.reducer;
