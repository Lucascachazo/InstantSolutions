const mongoose = require("mongoose")

const professionSchema = new mongoose.Schema({
    type: {type: String, required:true},
    urlPic: {type: String, required:true},
    descriptions:[String]
  }) 

const profession = mongoose.model("profession",professionSchema) 

module.exports = profession