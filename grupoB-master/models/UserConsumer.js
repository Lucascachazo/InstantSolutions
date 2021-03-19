const mongoose = require("mongoose")
// schema usuario consumidor, responderá al front con propiedades populadas del modelo usuario base

const userConsumerSchema = new mongoose.Schema({
    idUserBase: {type: mongoose.Schema.ObjectId, ref: "userBase"},
}) 

const userConsumer = mongoose.model("userConsumer",userConsumerSchema) 

module.exports = userConsumer