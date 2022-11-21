const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    hospital:{
        type:String,
        required:true
    },
    appointmentTimes:[
        {
            time:Date,
        }
    ],
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

})


module.exports =  mongoose.model('Doctors',doctorSchema)