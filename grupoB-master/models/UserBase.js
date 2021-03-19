const mongoose = require("mongoose")
// Schema base de usuarios, tanto modelo provider como consumer populan con este modelo

const userBaseSchema = new mongoose.Schema({
    firstName: {type:String,required:true},
    lastName: {type:String,required:true},
    urlPic: {type:String,required:false,default:'../assets/user.svg'},
    email: {type:String,required:true},
    phone: {type:String,required:false},
    password: {type:String,required:true},
    country: {type:String,required:false},
    rol: {type:String,required:true},
    tokenResetPassword:{type:String,required:false,default:''},
    requestResetPassword:{type:Number,required:false,default:0}
}) 

const userBase = mongoose.model("userBase", userBaseSchema) 

module.exports = userBase