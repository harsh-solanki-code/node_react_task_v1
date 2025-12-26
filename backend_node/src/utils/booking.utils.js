const getTimeRange = (bookingType, bookingSlot, startTime, endTime) => {
  if (bookingType === 'FULL_DAY') {
    return { start: '09:00:00', end: '18:00:00' };
  }

  if (bookingType === 'HALF_DAY') {
    if (bookingSlot === 'FIRST_HALF') {
      return { start: '09:00:00', end: '13:00:00' };
    }
    return { start: '13:00:00', end: '18:00:00' };
  }

  return { start: startTime, end: endTime };
};

module.exports = { getTimeRange };
