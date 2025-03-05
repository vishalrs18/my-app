import { configureStore, createSlice } from "@reduxjs/toolkit";

export const userInitialState = { login: false, user_id: null, email: null, permission: [], is_admin: null };

const authSlice = createSlice({
  name: "auth",
  initialState: userInitialState,
  reducers: {
    userData(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const store = configureStore({
  reducer: {
    userData: authSlice.reducer,
  },
});

export const { userData } = authSlice.actions;
