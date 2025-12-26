const AppDataSource = require('../config/data-source');
const { getTimeRange } = require('../utils/booking.utils');

const BookingRepo = () => AppDataSource.getRepository('Booking');

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

  /* Overlap check logic intution
    - think like one window for time range and do the logic for system
    - two main parts 

    - just think first like that what is non-overlapping condition and after based on that i made a condition
      for overlapping 

    - two clear points

      1. new booking before existing 
      -> existing.start => new.end this is true cond.
      now for overlapping check (existing.start < new.end)

      2. new booking after existing
      -> existing.end <= new.start this is true cond.
      now for overlapping check like reverse or not this condition
      (existing.end > new.start)

      with use of AND operator we can finally check that condition for overlappingg.

    - I normalize all booking types into time ranges on the same day and apply a standard interval overlap check.
      That single rule enforces all booking constraints.

    - this one condition covers all the rules for that booking system.
   */
  const overlapping = await BookingRepo()
    .createQueryBuilder('b')
    .where('b.bookingDate = :date', { date: bookingDate })
    .andWhere('b.startTime < :end')
    .andWhere('b.endTime > :start')
    .setParameters({ start, end })
    .getOne();

  if (overlapping) {
    return res.status(409).json({
      message: 'Booking overlaps with an existing booking',
    });
  }

  const booking = BookingRepo().create({
    customerName,
    customerEmail,
    bookingDate,
    bookingType,
    bookingSlot,
    startTime: start,
    endTime: end,
    user: req.user,
  });

  await BookingRepo().save(booking);

  res.status(201).json({ message: 'Booking created successfully' });
};
