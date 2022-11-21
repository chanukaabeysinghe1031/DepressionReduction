const router = require('express').Router()
const {addUser, signin,getUserRecords, addAppointment}  = require('../controllers/user_controller')
router.post('/addUser',addUser)
router.post('/login',signin)
router.post('/records',getUserRecords)
router.post('/addAppointment',addAppointment)

module.exports =  router