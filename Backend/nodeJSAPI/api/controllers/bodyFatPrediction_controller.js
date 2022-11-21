const UserFatLevelRecords = require('../models/userFatLevelRecord')
const request = require('request-promise')

PYTHON_FLASK_API_URL = "http://127.0.0.1:5005/"

exports.predictBodyFatLevel = (req,res) => {
    const {
        userId,age, weight,height,neck,chest,abdomen,hip,knee,thigh,ankle,biceps,forearm,wrist,gender
     } = req.body 

    if(userId===""||age===""|| weight===""||height===""||neck===""
        ||chest===""||abdomen===""||hip===""||knee===""||thigh===""
        ||ankle===""||biceps===""||forearm===""||wrist===""||gender===""){
            res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        // Take the prediction for the body fat level from the flask api
        const options = {
            method: 'POST',
            uri: PYTHON_FLASK_API_URL+'predictBodyFat',
            body: {
                "modelInput":[[
                    parseFloat(age),
                    parseFloat(weight),
                    parseFloat(height),
                    parseFloat(neck),
                    parseFloat(chest),
                    parseFloat(abdomen),
                    parseFloat(hip),
                    parseFloat(thigh),
                    parseFloat(knee),
                    parseFloat(ankle),
                    parseFloat(biceps),
                    parseFloat(forearm),
                    parseFloat(wrist),
                    parseFloat(gender)
                ]]
            },
            json: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        request(options).then(function (response){
            let dataFromFlaskAPI = JSON.stringify(response)
            dataFromFlaskAPI= JSON.parse(dataFromFlaskAPI)
            dataFromFlaskAPI = dataFromFlaskAPI.prediction
            let fatLevelPrediction = dataFromFlaskAPI[0]*(-1);
            const newRecord  = new UserFatLevelRecords({
                userId,age, weight,height,neck,chest,abdomen,hip,knee,thigh,ankle,biceps,forearm,wrist,fatLevelPrediction,gender
            })
            newRecord.save()
            .then(result=>{
                console.log(result)
                res.json({
                    Status: "Successful",
                    Message: 'Record  has been saved successfully.',
                    Prediction : fatLevelPrediction
                })
            })
            .catch(error=>{
                console.log(error)

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