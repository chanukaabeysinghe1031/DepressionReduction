const User  = require('../models/user')
const bcrypt = require("bcryptjs");
const UserFatLevelRecords = require("../models/userFatLevelRecord")
const UserMoodRecords = require("../models/userMoodRecord")
const Appointments = require("../models/Appointments")
const request = require('request-promise')

PYTHON_FLASK_API_URL = "http://127.0.0.1:5005/"


// ************************* To register a user account **************************
exports.addUser =  async  (req,res) => {
    const {fullName,address,contactNo,email,password} = req.body

    if(fullName===""||email===""||password===""){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        console.log(email)
        const user = new User({
            fullName,
            email,
            password
        })

        User.find({email:email})
        .then(user=>{
            console.log(user)
            if(user.length>0){
                res.json({
                    Status: "Unsuccessful",
                    Message: "There is a user with this email address already."
                })
            }else{
                const newUser = new User({fullName,email,password})
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(responseSavingUser => {
                            console.log(responseSavingUser)
                            res.json({
                                Status: "Successful",
                                Message: 'User has been registered successfully.',
                                User: responseSavingUser
                            })
                        })
                        .catch(error => {
                            res.json({
                                Status: "Unsuccessful",
                                Message: "Happened saving the user in " +
                                    "DB.",
                                error: error.Message
                            })
                        })
                    })
                })
            }
        })
        .catch(error=>{
            console.log("HI"+error)
            res.json({
                Status: "Unsuccessful",
                Message: "Happened finding the user in " +
                    "DB.",
                error: error
            })
        })
    }
}
// ****************************** To login to a user account ******************************
exports.signin = async (req, res) => {
    const {email, password} = req.body;

    //Validation
    if (!email || !password) {
        res.json({Status: "Unsuccessful", Message: 'Email and password must be entered.'});
    }

    //Check for existing user
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                res.json({Status: "Unsuccessful", Message: 'Invalid user email.'})
            } else {
                //Validating password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            res.json({Status: "Unsuccessful", Message: "Password is incorrect."})
                        } else {
                            res.json({
                                Status: "Successful",
                                Message: 'User has been registered successfully.',
                                User: user
                            })
                        }
                    });
            }
        })
}

exports.getUsers = async (req,res) =>{
    User.find()
        .then(users=>{
            res.json({
                "Status":"Successful",
                "Users": users
            })
        })
        .catch(error=>{
            res.json({
                "Status":"Unsuccessful",
                "Error": error
            })
        })
}

exports.getUserRecords = (req,res) => {
    const {userId} = req.body

    if(userId===null||userId===""){
        res.json({Status: "Unsuccessful", Message: 'Email and password must be entered.'});
    }else{
        User.findById(userId)
            .then(user=>{
                if(user){
                    UserFatLevelRecords.find({userId:userId})
                        .then(userFatLevelRecords=>{
                            UserMoodRecords.find({userId:userId})
                                .then(userMoodRecords=>{
                                    res.json({
                                        "Status":"Successful",
                                        "UserFatLevels":userFatLevelRecords,
                                        "UserMoods":userMoodRecords
                                    })
                                })
                                .catch(error=>{
                                    console.log(error)
                                    res.json({
                                        "Status":"Unsuccessful",
                                        "Error": error,
                                        "Message":"Happened when getting fat levels records."
                                    })
                                })
                        })
                        .catch(error=>{
                            console.log(error)
                            res.json({
                                "Status":"Unsuccessful",
                                "Error": error,
                                "Message":"Happened when getting fat levels records."
                            })
                        })
                }else{
                    console.log("BAAA")

                    res.json({Status: "Unsuccessful", Message: 'Invalid user id.'})
                }
            })
            .catch(error=>{
                console.log(error)
                res.json({
                    "Status":"Unsuccessful",
                    "Error": error
                })
            })
    }
}

exports.addAppointment = (req,res) => {
    const {
        userId,
        appointmentDate,
        appointmentTime,
        age,
        scholarship,
        hypertension,
        diabetes,
        alcoholism,
        handcap,
        sms,
        gender } = req.body

    if(
        userId===""||age===null||scholarship===null||hypertension===null||diabetes===null||alcoholism===null||
        handcap===null||sms===null||gender===null||appointmentDate===null||appointmentTime===null
    ){
        res.json({Status: "Unsuccessful", Message: 'All data must be entered.'});
    }else{
        const options = {
            method: 'POST',
            uri: PYTHON_FLASK_API_URL+'predictNoShow',
            body: {
                "modelInput":[[
                    parseFloat(age),
                    parseInt(scholarship),
                    parseInt(hypertension),
                    parseInt(diabetes),
                    parseInt(alcoholism),
                    parseInt(handcap),
                    parseInt(sms),
                    parseInt(gender)
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
            let pred1 = dataFromFlaskAPI[0][0];
            let pred2 = dataFromFlaskAPI[0][1];
            let noShow;
            if(pred1>=pred2){
                noShow = true
            }else{
                noShow = false
            }
            const newRecord  = new Appointments({
                userId,age,noShow,appointmentDate,appointmentTime
            })
            newRecord.save()
                .then(result=>{
                    console.log(result)
                    res.json({
                        Status: "Successful",
                        Message: 'Record  has been saved successfully.',
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
    }
}