const mongoose = require("mongoose")
//schema usuario proveedor (profesional) consume algunas propiedades del modelo user base y se agregarán otras, propias del modelo userprovider

const reviewSchema = new mongoose.Schema({
    idUser:{type: mongoose.Schema.ObjectId, ref: "userConsumer"},
    comment: String
})
// las review tienen su propio schema, el mismo será llamado dentro del schema userprovider, propiedad review.
const userProviderSchema = new mongoose.Schema({
    idUserBase: {type: mongoose.Schema.ObjectId, ref: "userBase"},
    arrayValoration:{type:Array,default:3},
    review: [reviewSchema],
    arrayWorks:[String],
    idProfession: {type: mongoose.Schema.ObjectId, ref: "profession"}, // popula model profession
}) 

// el schema userProvider popula con el modelo rubro para consumir las profesiones dentro del mismo. 

const userProvider = mongoose.model("userProvider",userProviderSchema) 

module.exports = userProvider