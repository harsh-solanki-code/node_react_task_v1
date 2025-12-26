## API Testing
All APIs can be tested using curl.
Email verification and password reset use Ethereal Email.
Preview URLs are logged in the server console.

# Email service
- Ethereal Email used for local/testing
- Gmail SMTP can be configured via env for production


To ensure scalability with over 1M bookings, booking conflict detection is performed using indexed range queries at the database level. All booking types are normalized into time ranges and a standard interval overlap condition is applied. Booking creation is wrapped in a transaction to prevent race conditions under concurrent requests.