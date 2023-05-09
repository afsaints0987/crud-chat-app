const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        firstName: {
            type: String,
            default: ''
        },
        lastName: {
            type: String,
            default: ''
        },
        profileImg: {
            type: String,
            default: ''
        },
        birthday: {
            type: Date,
            required: false
        }
    }
}, {timestamps: true})

const Users = mongoose.model('Users', userSchema)
module.exports = Users