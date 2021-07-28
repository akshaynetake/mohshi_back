const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
    },
    token: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    role: {
        type: String
    },
    work_url: {
        type: String
    },
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
module.exports = mongoose.model('users', UserSchema);
