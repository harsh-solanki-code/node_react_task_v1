const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Booking',
  tableName: 'bookings',
  columns: {
    id: {
      primary: true,
      type: 'bigint',
      generated: true,
    },
    customerName: {
      type: 'varchar',
    },
    customerEmail: {
      type: 'varchar',
    },
    bookingDate: {
      type: 'date',
    },
    bookingType: {
      type: 'enum',
      enum: ['FULL_DAY', 'HALF_DAY', 'CUSTOM'],
    },
    bookingSlot: {
      type: 'enum',
      enum: ['FIRST_HALF', 'SECOND_HALF'],
      nullable: true,
    },
    startTime: {
      type: 'time',
      nullable: true,
    },
    endTime: {
      type: 'time',
      nullable: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
  indices: [
    {
      name: 'IDX_BOOKING_DATE',
      columns: ['bookingDate'],
    },
    {
      name: 'IDX_BOOKING_TIME',
      columns: ['bookingDate', 'startTime', 'endTime'],
    },
  ],
});
