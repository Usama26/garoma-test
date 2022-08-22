const router = require('express').Router();
const { User } = require('../models/user');
const { Booking } = require('../models/booking');
const status = require('./status');
var ObjectId = require('mongoose').Types.ObjectId;

const {  validateBooking } = require('../validations/user');


router.get("/meetingSlots", async (req, res) => {
  if (!req.query.userId)
    return res
      .status(status.GET_USER_SLOT_FAILED.code)
      .json({ ...status.GET_USER_SLOT_FAILED, message: 'No id provided' });

  try{

    let user = await User.findById(req.query.userId);


    let bookings = await Booking.find({
      $or: [
        { from_user: req.query.userId },
        { to_user: req.query.userId }
      ]
    });

    
    // let slots = user.days.map(day => {
    //   return {
    //     ...day,
    //     slots: day.slots.map(slot => {
    //       return {
    //         ...slot,
    //         bookings: bookings.filter(booking => {
    //           return (
    //             booking.from_time === slot.from_time &&
    //             booking.to_time === slot.to_time
    //           );
    //         })
    //       };
    //     })
    //   };
    // })
    let schedule = {}
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    user.days.map(day => {
      console.log(day.name);
      schedule[day.name] = []
      day.slots.map(slot => {
  
        bookingsArr = []
        bookings.forEach(booking => {
          if((booking.from_time === slot.from_time && booking.to_time === slot.to_time) && weekday[new Date(booking.meeting_date).getDay()] === day.name){
            bookingsArr.push(booking.meeting_date)
            // if(!slots[day.name]){
            //   slots[day.name] = []
            // }
            // slots[day.name].push(booking)
          console.log("X");
          }
          schedule[day.name].push({slot,booking_dates:bookingsArr})
        })

        console.log(slot);

        })
      })
    

   
    res.send({schedule});
  }
  catch(error){
    return res
      .status(status.GET_USER_SLOT_FAILED.code)
      .json({ ...status.GET_USER_SLOT_FAILED,       
        message: error.message
        ? error.message
        : status.GET_USER_SLOT_FAILED.message, });
  }
 


})

router.post('/bookMeeting', async (req, res) => {
    const validBooking = validateBooking(req.body);
  if (validBooking.error)
    return res.status(status.BOOK_MEETING_FAILED.code).json({
      ...status.BOOK_MEETING_FAILED,
      message: validBooking.error.details[0].message,
    });


    const { from_user, to_user, from_time, to_time, meeting_date } = req.body.data;
    


    if (meeting_date < new Date().toISOString()) {
      return res.status(status.BOOK_MEETING_FAILED.code).json({
        ...status.BOOK_MEETING_FAILED,
        message: 'Meeting date cannot be in the past',
      });
    }

  
    if (from_time > to_time) {
      return res.status(status.BOOK_MEETING_FAILED.code).json({
        ...status.BOOK_MEETING_FAILED,
        message: 'From time cannot be after to time',
      });}

    const users = await User.find({
      _id: { $in: [from_user, to_user] },
    });
    if (users.length !== 2)
      return res.status(status.BOOK_MEETING_FAILED.code).json({
        ...status.BOOK_MEETING_FAILED,
        message: 'No user found with the given id(s)',
      });

     // checking if the user is already booked for the same time
      const booking = await Booking.findOne({
        from_user: { $in: [from_user, to_user] },
        to_user: { $in: [from_user, to_user] },
        from_time, to_time, meeting_date
      });

      const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      console.log(new Date(meeting_date).getDay());
      console.log(weekday[new Date(meeting_date).getDay()]);

      if (booking)
        return res.status(status.BOOK_MEETING_FAILED.code).json({
          ...status.BOOK_MEETING_FAILED,
          message: 'Booking already exists',
        });


        let service = await User.findOne({
          'days.slots': {
            $elemMatch: {
              from_time,
              to_time,
            },
          },
          'days.name': weekday[new Date(meeting_date).getDay()],
          _id: to_user,
        });
        m = service.days.findIndex(x => x.name === weekday[new Date(meeting_date).getDay()]);
        let check = false

        service.days[m].slots.forEach(x => {
          if (x.from_time === from_time && x.to_time === to_time) check = true
        } )
          

        if(!service || !check)
        return res.status(status.BOOK_MEETING_FAILED.code).json({
          ...status.BOOK_MEETING_FAILED,
          message: 'No Slot available',
        });



        const newBooking = new Booking({
            from_user,
            to_user,
            from_time,
            to_time,
            meeting_date
        });
        const savedBooking = await newBooking.save();
        return res
      .status(status.BOOK_MEETING_SUCCESS.code)
      .json({ ...status.BOOK_MEETING_SUCCESS, payload: savedBooking });



})

module.exports = router;
