 const UserMoodRecords= require('../models/userMoodRecord')
const request = require('request-promise')


PYTHON_FLASK_API_URL = "http://127.0.0.1:5005/"
// ************************* To predict body fat **************************
exports.predictMood= async (req,res) => {
    const {
        userId
     } = req.body 

    if(userId===""||req.file===null||userId===null){
            res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        // Take the prediction for the body fat level from the flask api
        console.log(req.file.filename)
        const options = {
            method: 'POST',
            uri: PYTHON_FLASK_API_URL+"predictMood",
            body: {
                "moodImage":req.file.filename
            },
            json: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        request(options)
        .then(function (response){
            console.log(response)
            let dataFromFlaskAPI = JSON.stringify(response)
            dataFromFlaskAPI= JSON.parse(dataFromFlaskAPI)
            dataFromFlaskAPI = dataFromFlaskAPI.PredictedMood
            console.log(dataFromFlaskAPI)

            const newRecord  = new UserMoodRecords({
                userId,
                image:req.file.path,
                moodPrediction:dataFromFlaskAPI
            })
            newRecord.save()
            .then(result=>{
                res.json({
                    Status: "Successful",
                    Message: 'Record  has been saved successfully.',
                    Prediction : dataFromFlaskAPI
                })
            })
            .catch(error=>{
                res.json({
                    Status: "Unsuccessful",
                    Message: "Happened while saving the body fat record in the DB.",
                    error: error
                })
            })
        })
        .catch(function (err) {
            res.json({
                Status: "Unsuccessful",
                Message: "Happened while sending the request to Flask API",
                error: err
            })
        })
    }
}