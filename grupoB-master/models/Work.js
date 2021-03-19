const mongoose = require("mongoose")

const workSchema = new mongoose.Schema({
  idUserConsumer:{type: mongoose.Schema.ObjectId, ref: "userConsumer"},
  idUserProvider:{type: mongoose.Schema.ObjectId, ref: "userProvider"},
  state: {type:Number, required:false, default:1},
  }) 

const work = mongoose.model("work", workSchema)

module.exports = work