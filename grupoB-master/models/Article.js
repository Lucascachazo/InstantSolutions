const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
   title:String,
   pic:String,
   url:String,
   description:String
})

const article = mongoose.model('article', articleSchema)

module.exports = article