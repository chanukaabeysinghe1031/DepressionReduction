const express = require("express");
const app = express();
const connectDB = require('./db/connection')
const cors = require('cors')

const userRouter = require('./api/routes/user_routes')
const moodPredictionRouter = require('./api/routes/moodPrediction_routes')
const bodyFatLevelPredictionRouter = require('./api/routes/bodyFatPrediction_routes')
const doctorRouter = require('./api/routes/doctor_routes')

// ROUTES
app.get('/',(req,res)=>{
    res.send("This is depression App's API")
})

connectDB();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static('uploads'));

app.use('/api/users',userRouter )
app.use('/api/bodyFatLevel',bodyFatLevelPredictionRouter )
app.use('/api/moods',moodPredictionRouter )
app.use('/api/doctors',doctorRouter )
app.listen(3006);