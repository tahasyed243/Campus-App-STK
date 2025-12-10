import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: true, // ⚡ true by default for reload check
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem("user"); // logout ke liye
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
