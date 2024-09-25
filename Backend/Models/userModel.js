const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            trim : true,
            unique : true
        },
        phone : {
            type : String,
            required : true,
            trim : true
        },
        password : {
            type : String,
            required : true,
            minlength : 8
        }
    },
    {
        timestamps : true // Adds createdAt and updatedAt timestamps
    }
)

// create the model User and export
const User = mongoose.model('User', userSchema)
module.exports = User
