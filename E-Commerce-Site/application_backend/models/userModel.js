const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userDetails = new Schema({
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    phone : {type : String, required : true},
    cartProducts : []
})

const userDetailsModel = mongoose.model('userDetails', userDetails)
module.exports = userDetailsModel