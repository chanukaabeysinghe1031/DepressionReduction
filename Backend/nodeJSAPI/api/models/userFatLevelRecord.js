const mongoose = require('mongoose')
const userFatRecordSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    recordedDate: {
        type: Date,
        default : Date.now()
    },
    age:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    neck:{
        type:Number,
        required:true
    },
    chest:{
        type:Number,
        required:true
    },
    abdomen:{
        type:Number,
        required:true
    },
    hip:{
        type:Number,
        required:true
    },
    knee:{
        type:Number,
        required:true
    },
    thigh:{
        type:Number,
        required:true
    },
    ankle:{
        type:Number,
        required:true
    },
    biceps:{
        type:Number,
        required:true
    },
    forearm:{
        type:String,
        required:true
    },
    wrist:{
        type:Number,
        required:true
    },
    fatLevelPrediction:{
        type:Number,
        required:true
    },
    gender:{
        type:Number,
        required:true
    },
})


module.exports =  mongoose.model('UserFatRecords',userFatRecordSchema)