const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        // type: mongoose.Schema.Types.ObjectId,
        type:String,
        ref: 'user'
    },
    email: {
        type:String,
        ref:'user'
    },
    ground: String,
    duration: Number,
    bookingDate: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model('booking', bookingSchema);
