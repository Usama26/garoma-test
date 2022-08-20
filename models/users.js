const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


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

}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);


module.exports.userSchema = userSchema;
module.exports.User = User;