const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/divyesh");

const userschema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    password:{
        type:String
    }
});

const model = mongoose.model('bcrypt',userschema);

module.exports = model;