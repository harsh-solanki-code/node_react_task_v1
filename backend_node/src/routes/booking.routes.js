const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const booking = require('../controller/booking.controller');

router.use(auth);

router.post('/', booking.createBooking);

module.exports = router;
