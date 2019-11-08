const mongoose = require('mongoose')

const artSchema = new mongoose.Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: [String] },
});

const art = mongoose.model('art', artSchema);

module.exports = art;
