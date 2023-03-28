const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    number:Number,
    city:String,
    gender:String
})

module.exports = mongoose.model("users",userSchema);