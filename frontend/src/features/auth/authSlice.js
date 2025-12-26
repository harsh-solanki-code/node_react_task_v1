import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const login = createAsyncThunk('auth/login', async (data) => {
  const res = await api.post('/auth/login', data);
  localStorage.setItem('token', res.data.token);
  return res.data;
});

export const register = createAsyncThunk('auth/register', async (data) => {
  return api.post('/auth/register', data);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => (s.loading = true))
      .addCase(login.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
      })
      .addCase(login.rejected, (s) => {
        s.loading = false;
        s.error = 'Invalid credentials or email not verified';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
