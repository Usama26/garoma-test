const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const app = express();

app.use(express.json());
const general = require('./routes/general');




app.use('/api', general);

module.exports = app;