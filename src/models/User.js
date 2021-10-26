const mongoose = require("mongoose")

const UseSchema = new mongoose.Schema({
    email: String,
})

module.exports = mongoose.model('User', UseSchema)