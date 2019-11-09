const mongoose = require('mongoose')

const criticSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 7 },
    post: { type: String, required: true },
});

const critic = mongoose.model('critic', criticSchema);

module.exports = critic;

