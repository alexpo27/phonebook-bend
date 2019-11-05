const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-beautiful-unique-validation')
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((err) => {
        console.log('error connecting to mongoDB: ', err.message)
    })

const personSchema = new mongoose.Schema({
    name: { type: String, minlength: 3, required: true },
    number: { type: String, minlength: 8, required: true }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)