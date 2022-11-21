const Doctor  = require('../models/Doctor')
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Appointments = require("../models/Appointments")

// ************************* To register a doctor account **************************
exports.addDoctor=  async  (req,res) => {
    const {fullName,address,education, hospital,contactNo,email,password} = req.body

    if(fullName===""||email===""||password===""){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        console.log(email)
        Doctor.find({email:email})
            .then(user=>{
                console.log(user)
                if(user.length>0){
                    res.json({
                        Status: "Unsuccessful",
                        Message: "There is a user with this email address already."
                    })
                }else{
                    const newUser = new Doctor({
                        fullName,
                        email,
                        password,
                        address,
                        education,
                        hospital,
                        contactNo
                    })
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

exports.signin = async (req, res) => {
    const {email, password} = req.body;

    //Validation
    if (!email || !password) {
        res.json({Status: "Unsuccessful", Message: 'Email and password must be entered.'});
    }

    //Check for existing user
    Doctor.findOne({email: req.body.email})
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

exports.getAppointments = (req,res) => {
    Appointments.find()
        .then(appointments=>{
            res.json({
                Status: "Successful",
                Message: 'Appointments have been received.',
                Appointments: appointments
            })
        })
        .catch(error=>{
            res.json({
                Status: "Unsuccessful",
                Message: "Happened getting appointments in " +
                    "DB.",
                error: error
            })
        })
}