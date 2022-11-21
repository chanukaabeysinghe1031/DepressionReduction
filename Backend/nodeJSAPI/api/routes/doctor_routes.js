const router = require('express').Router()
const {addDoctor,signin, getAppointments}  = require('../controllers/doctor_controller')
router.post('/addDoctor',addDoctor)
router.post('/login',signin)
router.get('/getAppointments',getAppointments)

module.exports =  router