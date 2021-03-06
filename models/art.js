const mongoose = require('mongoose')

const artSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 7 },
    img: { type: String, required: true },
    description: { type: String },
    tag: { type: [String] },
    post: { type: [String] },
    name: { type: [String] },
});

const art = mongoose.model('art', artSchema);

module.exports = art;

