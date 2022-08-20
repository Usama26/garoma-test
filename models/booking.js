const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const bookingSchema = mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    status:{
        type :String
    },
    from_time:{
        type: String,

    },
    to_time:{
        type: String,
    },
    meeting_date:{
        type : Date
    },
}, {
    timestamps: true
});


const Booking = mongoose.model('Booking', bookingSchema);

module.exports.bookingSchema = bookingSchema;
module.exports.BookingModel = Booking;