const express = require('express');
const { selectGround, bookSlot, makePayment } = require('../controllers/turfController');
const protect = require('../middlewares/auth');
const router = express.Router();

router.get('/groundSelection', protect, selectGround);
router.post('/bookSlot', protect, bookSlot);
router.post('/payment', protect, makePayment);

module.exports = router;
