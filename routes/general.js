const router = require('express').Router();
const { User } = require('../models/user');


router.get("/", async (req, res) => {
 let x = await User.find()
let y = await User({name: "John" , email : "m@m.com" , password:"999"}).save();
  res.send({y,x});

})

router.post('/bookMeeting', async (req, res) => {
  
    const { from_user, to_user, from_time, to_time, meeting_date } = req.body;
    const booking = new Booking({ from_user, to_user, from_time, to_time, meeting_date });
    
    const savedBooking = await booking.save();
    
    res.send(savedBooking);

})

module.exports = router;
