const mongoose = require('mongoose')
const appointmentsSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    recordedDate: {
        type: Date,
        default : Date.now()
    },
    noShow:{
        type:Boolean,
        required:true
    },
   appointmentDate:{
        type:Date,
       required:true
   },
    appointmentTime:{
        type:String,
        required:true
    }
})


module.exports =  mongoose.model('Appointments',appointmentsSchema)