const AppDataSource = require('../config/data-source');
const { getTimeRange } = require('../utils/booking.utils');

exports.createBooking = async (req, res) => {
  const {
    customerName,
    customerEmail,
    bookingDate,
    bookingType,
    bookingSlot,
    startTime,
    endTime,
  } = req.body;

  const { start, end } = getTimeRange(
    bookingType,
    bookingSlot,
    startTime,
    endTime
  );

  try {
    await AppDataSource.transaction(async (manager) => {
      const overlapping = await manager
        .getRepository('Booking')
        .createQueryBuilder('b')
        .where('b.bookingDate = :date', { date: bookingDate })
        .andWhere('b.startTime < :end')
        .andWhere('b.endTime > :start')
        .setParameters({ start, end })
        .getOne();

      if (overlapping) {
        throw new Error('BOOKING_OVERLAP');
      }

      const booking = manager.getRepository('Booking').create({
        customerName,
        customerEmail,
        bookingDate,
        bookingType,
        bookingSlot,
        startTime: start,
        endTime: end,
        user: req.user,
      });

      await manager.save(booking);
    });

    return res.status(201).json({
      message: 'Booking created successfully',
    });
  } catch (err) {
    if (err.message === 'BOOKING_OVERLAP') {
      return res.status(409).json({
        message:
          'Selected time slot is already booked. Please choose a different date or time.',
      });
    }

    console.error('Booking creation failed:', err);

    return res.status(500).json({
      message: 'Unable to create booking. Please try again later.',
    });
  }
};
