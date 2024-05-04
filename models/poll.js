const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    options: {
        type: Map,
        of: Number,
        required: true
    }
}, {timestamps: true});

const Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;