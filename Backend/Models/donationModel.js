const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema(
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
        },
        phone : {
            type : String,
            required : true,
            trim : true
        },
        location : {
            type : String,
            required : true,
            trim : true
        },
        foodname : {
            type : String,
            required : true,
            trim : true
        },
        quantity : {
            type : String,
            required : true,
        },
        description : {
            type : String,
            trim : true
        }
    },
    {
        timestamps : true
    }
)

const Donation = mongoose.model('Donation', donationSchema)
module.exports = Donation
