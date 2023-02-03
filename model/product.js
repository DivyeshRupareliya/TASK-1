const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/divyesh");

const product_schema = new mongoose.Schema({
    product_company:{
        type:String
    },
    product_name:{
        type:String
    }
});

const product_model = mongoose.model('product' ,product_schema);

module.exports = product_model;