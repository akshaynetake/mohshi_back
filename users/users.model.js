const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
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
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
module.exports = mongoose.model('users', UserSchema);
