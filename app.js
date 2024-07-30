require('dotenv').config();
const express = require('express');
const cors = require('cors');
const flightRouter = require('./routes/FlightRoutes');
const bodyParser = require('body-parser')
const app = express();
const cookieParser = require('cookie-parser')
require('./db/connection')
require('./seed')



const admin = require('firebase-admin');
const serviceAccount = require('./service-account-file.json')

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/flight',flightRouter);



module.exports = app;