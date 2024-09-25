const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema(
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
        timestamps : true 
    }
)

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin
