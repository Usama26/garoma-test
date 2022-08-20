const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const app = express();

//Middlewares
app.use(express.json());
const general = require('./routes/general');




app.use('/api', general);

// Setting up timezone
const moment = require('moment-timezone');
moment.tz.setDefault(process.env.TIMEZONE||"America/New_York");

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(process.env.SERVER_PORT, () => console.log('Server Running On Port : ' + process.env.SERVER_PORT));