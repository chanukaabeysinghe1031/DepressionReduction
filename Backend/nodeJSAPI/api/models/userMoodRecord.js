const mongoose = require('mongoose')
const userMoodrecordSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    recordedDate: {
        type: Date,
        default : Date.now()
    },
    moodPrediction:{
        type:String,
        required:true
    }
})


module.exports =  mongoose.model('UserMoodRecords',userMoodrecordSchema)