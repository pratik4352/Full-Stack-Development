const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    destination: { type: String, required: true },
    duration: { type: Number, required: true }, // in days
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    activities: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Package', packageSchema);
