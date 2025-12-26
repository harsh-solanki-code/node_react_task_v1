// src/pages/Booking.jsx
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createBooking } from '../features/booking/bookingSlice';

export default function Booking() {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch } = useForm();

  const bookingType = watch('bookingType');

  const onSubmit = (data) => {
    dispatch(createBooking(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <h2>Create Booking</h2>

      <input {...register('customerName', { required: true })} placeholder="Customer Name" />
      <input {...register('customerEmail', { required: true })} placeholder="Customer Email" />
      <input type="date" {...register('bookingDate', { required: true })} />

      <select {...register('bookingType', { required: true })}>
        <option value="">Select Booking Type</option>
        <option value="FULL_DAY">Full Day</option>
        <option value="HALF_DAY">Half Day</option>
        <option value="CUSTOM">Custom</option>
      </select>

      {bookingType === 'HALF_DAY' && (
        <select {...register('bookingSlot', { required: true })}>
          <option value="">Select Slot</option>
          <option value="FIRST_HALF">First Half</option>
          <option value="SECOND_HALF">Second Half</option>
        </select>
      )}

      {bookingType === 'CUSTOM' && (
        <>
          <input type="time" {...register('startTime', { required: true })} />
          <input type="time" {...register('endTime', { required: true })} />
        </>
      )}

      <button>Create Booking</button>
    </form>
  );
}
