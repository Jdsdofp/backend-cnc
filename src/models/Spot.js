const mongoose = require("mongoose");
require("dotenv").config()

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    }
});

SpotSchema.virtual('thumbnail_url').get(function() {
    return `${process.env.APP_URL}/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);
