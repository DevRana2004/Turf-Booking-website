const Booking = require('../models/booking');
const calculatePrice = require('../utils/calculatePrice');
const { assignSlotUsingHungarianAlgorithm } = require('../utils/hungarianAlgorithm');

// Ground Selection
module.exports.selectGround = (req, res) => {
    res.render('groundSelection');
};

// Slot Booking using Hungarian Algorithm
// module.exports.bookSlot = async (req, res) => {
//     try {
//         const { ground, duration, bookingDate } = req.body;

//         const price = calculatePrice(duration);
//         const assignedSlot = assignSlotUsingHungarianAlgorithm(ground);

//         const booking = await Booking.create({
//             user: req.user.id,
//             ground,
//             time: assignedSlot,
//             price
//         });

//         res.render('payment', { booking });
//     } catch (err) {
//         res.status(400).send('Slot booking failed: ' + err.message);
//     }
// };
// Slot Booking using Hungarian Algorithm
module.exports.bookSlot = async (req, res) => {
    try {
        const { ground, duration, bookingDate } = req.body;

        // Calculate price directly
        if (duration <= 0) {
            throw new Error("Invalid duration.");
        }

        const price = duration * 1000; // Calculate price directly

        const assignedSlot = assignSlotUsingHungarianAlgorithm(ground);

        // Create the booking with the calculated price
        const booking = await Booking.create({
            user: req.user.id,
            ground,
            time: assignedSlot,
            price
        });

        // Pass the price to the payment result template
        res.render('payment', { amount: price }); // Pass the calculated price directly
    } catch (err) {
        res.status(400).send('Slot booking failed: ' + err.message);
    }
};

// Payment Processing
module.exports.makePayment = (req, res) => {
    try {
        res.send('Payment successful');
    } catch (err) {
        res.status(400).send('Payment failed: ' + err.message);
    }
};
