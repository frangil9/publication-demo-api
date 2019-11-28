const { Schema, model } = require('mongoose');

const PublicationShema = new Schema({
    title: String,
    description: String,
    price: Number,
    ubication: String,
    imageUrl: String,
    created: { type: Date, default: Date.now() },
    active: { type: Boolean, default: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Publication', PublicationShema);