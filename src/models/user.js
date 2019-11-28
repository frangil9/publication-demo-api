const { Schema, model } = require('mongoose');

const UserShema = new Schema({    
    name: String,
    last_name: String,
    email: { type: String, unique: true, lowercase: true, required: true, trim: true },
    password: String,
    last_login: Date,
    created_at: { type: Date, default: Date.now() },
    validated: { type: Boolean, default: true },
    validate_token: String
});

module.exports = model('User', UserShema);