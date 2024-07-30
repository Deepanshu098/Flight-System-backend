const mongoose = require('mongoose');

const Token = new mongoose.Schema({
    fcmToken: { type: String, required: true },
},{timestamps:true})

const TokenModel = mongoose.model('token',Token);

module.exports = TokenModel;