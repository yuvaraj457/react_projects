const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userDetails = new Schema({
    firstName : {type : String},
    lastName : {type : String},
    email : {type : String},
    password : {type : String, default:null},
    phone : {type : String, default:'-'},
    cartProducts : [],
    address : [],
    activeAddress : {type : String, default:'-'},
    userType : {type : String, default:'user'},
    emailVerified : {type : Boolean, default:false},
    emailVerificationToken : {type : String},
    emailVerificationExpires : {type : Number},
    resetPasswordToken : {type : String},
    resetPasswordExpires : {type : Number},
    googleUser : {type : Boolean, default:false}
})

const userDetailsModel = mongoose.model('userDetails', userDetails)
module.exports = userDetailsModel