const mongoose = require('mongoose');

// Esquema base del usuario para MongoDB.
const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: {type: String, required : true, unique: true}
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)
