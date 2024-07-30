const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    notification_id: String,
    flight_id: String,
    message: String,
    timestamp: Date,
    method: String,
    recipient: String
},{timestamps:true});

const NotificationModel = mongoose.model('Notification',NotificationSchema);

module.exports = NotificationModel;