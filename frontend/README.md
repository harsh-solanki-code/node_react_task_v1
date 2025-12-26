## Booking System – Architecture & Performance

### Authentication
- JWT based authentication
- Users must verify email before login
- Protected routes enforced on frontend

### Booking Logic
- All booking types (Full Day, Half Day, Custom) are normalized into time ranges
- A single interval overlap check is used:

  existing.start < new.end AND existing.end > new.start

- This rule prevents all duplicate and overlapping bookings

### Performance Considerations
- Booking conflict detection is handled at database level using indexed queries
- Composite index on (booking_date, start_time, end_time)
- Overlap check uses existence query with LIMIT 1
- Booking creation is wrapped in a transaction to prevent race conditions

### Tech Stack
- Backend: Node.js, Express, TypeORM, MySQL
- Frontend: React, Redux Toolkit, React Hook Form
