
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


function validateBooking(booking) {
    const schema =  Joi.object({
        data: Joi.object({
            from_user: Joi.objectId().required(),
            to_user: Joi.objectId().required(),
            from_time: Joi.string().required(),
            to_time: Joi.string().required(),
            meeting_date: Joi.string().required(),
        }).required()
    });

    return schema.validate(booking);
}



module.exports.validateBooking = validateBooking;