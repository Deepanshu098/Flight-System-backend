const FlightModel = require("../model/Flights");
const NotificationModel = require("../model/Notifications");
const { admin } = require('../app');
const nodemailer = require('nodemailer');
const TokenModel = require("../model/Token");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
});


// Function to send email notifications
const sendEmailNotification = (notification) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: notification.recipient,
        subject: 'Flight Status Update',
        text: notification.message,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };


//Get all flights
exports.getAllFlights = async(req,res)=>{
    try{
        const flights = await FlightModel.find();
        // console.log(flights)
        res.status(200).json({
            status:'success',
            flights
        })
    }
    catch(err){
        res.json({
            status:'failed',
            error:err.message
        })
    }
}

//Update flight status
exports.updateFlightsStatus = async(req,res)=>{
        const{flight_id,status} = req.body;
    
        try {
            const flight = await FlightModel.findOne({ flight_id });
            if (!flight) {
              return res.status(404).send('Flight not found');
            }
        
            if (flight.status !== status) {
              flight.status = status;
              await flight.save();
        
              // Prepare notification
              await sendNotification(flight);
              res.json('Flight status updated and notification sent');
            } else {
              res.send('Flight status is unchanged');
            }
          } catch (err) {
            console.error('Error updating flight status:', err);
            res.status(500).send('Internal server error');
          }
}



const sendNotification = async (flight,req) => {
    const notifications = await NotificationModel.find({ flight_id: flight.flight_id });
    const newMessage = `Your flight ${flight.flight_id} is now ${flight.status}.`;
    notifications.forEach(async notification => {
        notification.message = newMessage;
        notification.timestamp = new Date();
        await notification.save();
        console.log(notification)

      if (notification.method === 'Email') {
        sendEmailNotification(notification);
      } else if (notification.method === 'App') {
        // Retrieve the FCM token from cookies
        const fcmTokens = await TokenModel.find();
            sendAppNotification(notification, fcmTokens);
            // console.log(fcmTokens)
        }
           else {
            console.error('No FCM token found in cookies');
          }
      });
  };



                    const sendAppNotification = async(notification, tokens) => {
                        try{
                        const data = {
                          notification: {
                            title: `Flight Status Update`,
                            body: notification.message,
                          },
                          token: tokens.map(token=>token.fcmToken), // Use token from cookies
                        };
                        // console.log("mess",Message)
                        const response = await admin.messaging().send(data)
                        console.log('response',response)
                        }
                          catch(error) {
                            console.log('Error sending message:', error);
                          };
                      };




