const mongoose = require('mongoose');

const slotSchema = mongoose.Schema({
    name:String,
    slots : [{
        from_time: String,
        to_time: String,
        bookings: {
            type: mongoose.Schema.Types.Mixed
          }
    }]
  });

const Slots = mongoose.model('Slots', slotSchema);
module.exports.Slots = Slots;


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        maxlength: 255
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxlength: 255
    },
    password: {
        type: String,
        required: true
    },
    days:[
        slotSchema
    ],

}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);


module.exports.userSchema = userSchema;
module.exports.User = User;