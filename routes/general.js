const router = require('express').Router();
const { User } = require('../models/user');
const status = require('./status');

const {  validateBooking } = require('../validations/user');


router.get("/", async (req, res) => {
 let x = await User.find()
let y = await User({name: "John" , email : "m@m.com" , password:"999"}).save();
  res.send({y,x});

})

router.post('/bookMeeting', async (req, res) => {
    const validBooking = validateBooking(req.body);
  if (validBooking.error)
    return res.status(status.BOOK_MEETING_FAILED.code).json({
      ...status.BOOK_MEETING_FAILED,
      message: validBooking.error.details[0].message,
    });

    // if both ids are same then return error
    if (req.body.from_user == req.body.to_user) {
        return res.status(status.BOOK_MEETING_FAILED.code).json({
            ...status.BOOK_MEETING_FAILED,
            message: 'Both users cannot be same',
        })};
    
    const users = await User.find({
      _id: { $in: [req.body.data.from_user, req.body.data.to_user] },
    });
    if (users.length !== 2)
      return res.status(status.BOOK_MEETING_FAILED.code).json({
        ...status.BOOK_MEETING_FAILED,
        message: 'No user found with the given id(s)',
      });


    const booking = new Booking({ from_user, to_user, from_time, to_time, meeting_date });
    
    const savedBooking = await booking.save();
    
    res.send(savedBooking);

})

module.exports = router;
