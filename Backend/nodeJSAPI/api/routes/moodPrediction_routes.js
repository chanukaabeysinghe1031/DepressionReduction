const router = require('express').Router()
const multer = require("multer");
const {predictMood}  = require('../controllers/moodPredictionController')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, "uploadedImage.jpeg");
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 500},
    fileFilter: fileFilter

});


router.post('/predictMood',upload.single('moodImage'),predictMood)

module.exports =  router