const mongoose = require('mongoose');
const Flight = require('./model/Flights');
const Notification = require('./model/Notifications');
require('dotenv').config();
const DB = process.env.MONGODB;

//mock data

const flights = [
    {
        flight_id: "6E 2341",
        airline: "Indigo",
        status: "On Time",
        departure_gate: "A12",
        arrival_gate: "B7",
        scheduled_departure: new Date("2024-07-26T14:00:00Z"),
        scheduled_arrival: new Date("2024-07-26T18:00:00Z"),
        actual_departure: null,
        actual_arrival: null
    },
    {
        flight_id: "6E 2342",
        airline: "Indigo",
        status: "Delayed",
        departure_gate: "C3",
        arrival_gate: "D4",
        scheduled_departure: new Date("2024-07-26T16:00:00Z"),
        scheduled_arrival: new Date("2024-07-26T20:00:00Z"),
        actual_departure: null,
        actual_arrival: null
    },
    {
        flight_id: "6E 2343",
        airline: "Indigo",
        status: "Cancelled",
        departure_gate: "E2",
        arrival_gate: "F1",
        scheduled_departure: new Date("2024-07-26T12:00:00Z"),
        scheduled_arrival: new Date("2024-07-26T16:00:00Z"),
        actual_departure: null,
        actual_arrival: null
    }
];

const notifications = [
    {
        notification_id: "1",
        flight_id: "6E 2341",
        message: "Your flight 6E 2341 is on time. Departure gate: A12.",
        timestamp: new Date("2024-07-26T13:00:00Z"),
        method: "SMS",
        recipient: "+1234567890"
    },
    {
        notification_id: "2",
        flight_id: "6E 2342",
        message: "Your flight 6E 2342 is delayed. New departure time: 2024-07-26T17:00:00Z. Departure gate: C3.",
        timestamp: new Date("2024-07-26T15:30:00Z"),
        method: "Email",
        recipient: "kumar121deep@gmail.com"
    },
    {
        notification_id: "3",
        flight_id: "6E 2343",
        message: "Your flight 6E 2343 has been cancelled.",
        timestamp: new Date("2024-07-26T11:00:00Z"),
        method: "App",
        recipient: "user_app_id_12345"
    }
];


//Connect to mongodb with seed data

mongoose.connect(DB)
    .then(async()=>{
        await Flight.deleteMany({});
        await Notification.deleteMany({});

        await Flight.insertMany(flights);
        await Notification.insertMany(notifications);
        console.log('Database seeded successfully!!');
        // process.exit();
    })
    .catch(err=>{
        console.log('Error connecting in MongoDB',err);
        process.exit(1);
    });