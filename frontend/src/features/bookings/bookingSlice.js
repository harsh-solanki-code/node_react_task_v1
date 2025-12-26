// src/features/booking/bookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const createBooking = createAsyncThunk(
  'booking/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post('/bookings', data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: { loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (s) => (s.loading = true))
      .addCase(createBooking.fulfilled, (s) => {
        s.loading = false;
        alert('Booking created successfully');
      })
      .addCase(createBooking.rejected, (s, a) => {
        s.loading = false;
        alert(a.payload || 'Booking failed');
      });
  },
});

export default bookingSlice.reducer;
