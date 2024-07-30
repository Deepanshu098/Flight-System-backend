const express = require('express');
const { getAllFlights, updateFlightsStatus } = require('../controller/FlightController');
const FlightModel = require('../model/Flights');
const TokenModel = require('../model/Token');
// const { sendNotification, getNotification } = require('../controller/NotificationController');
const flightRouter = express.Router();


flightRouter.get('/get',getAllFlights);
flightRouter.put('/update',updateFlightsStatus);


flightRouter.post('/fcmtoken',async (req, res) => {
    const {  fcmToken } = req.body;
    if (!fcmToken) {
        return res.status(400).send('FCM token is required');
      }
    
      try {
        const newToken = new TokenModel({ fcmToken });
        await newToken.save();
        res.send('FCM token stored successfully');
      } catch (err) {
        console.error('Error storing FCM token:', err);
        res.status(500).send('Internal server error');
      }
    }
  )


module.exports = flightRouter;