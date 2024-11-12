import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';
import superuserReducer from './slices/superUserSlice';

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    superusers: superuserReducer, // Add the superuser slice reducer here
  },
});

export default store;
