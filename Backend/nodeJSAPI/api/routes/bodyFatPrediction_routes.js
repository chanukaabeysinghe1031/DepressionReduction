const router = require('express').Router()
const { predictBodyFatLevel}  = require('../controllers/bodyFatPrediction_controller')
router.post('/predictBodyFat',predictBodyFatLevel)
module.exports =  router