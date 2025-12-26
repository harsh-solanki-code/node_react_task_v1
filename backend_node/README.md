## API Testing
All APIs can be tested using curl.
Email verification and password reset use Ethereal Email.
Preview URLs are logged in the server console.

# Email service
- Ethereal Email used for local/testing
- Gmail SMTP can be configured via env for production


To ensure scalability with over 1M bookings, booking conflict detection is performed using indexed range queries at the database level. All booking types are normalized into time ranges and a standard interval overlap condition is applied. Booking creation is wrapped in a transaction to prevent race conditions under concurrent requests.

# Overlap check logic intution
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
