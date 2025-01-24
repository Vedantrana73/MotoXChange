const mongoose = require('mongoose')

const authenticationSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    }
)

const Authentication = mongoose.model('Authentication',authenticationSchema)
module.exports = Authentication