const express = require('express')
const { expressjwt } = require('express-jwt')
const mongoose = require('mongoose')
const morgan = require('morgan')
const multer = require('multer')
const AWS = require('aws-sdk')
const multerS3 = require('multer-s3')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log('Connected to album DB'))
    .catch(err => console.log(err))


app.use("/api/authenticate", require('./routes/userRouter'))
app.use("/api/authenticate", expressjwt({secret: process.env.SECRET, algorithms:['HS256'] }))
app.use("/api/upload", require('./routes/uploadRoute'))


    //error handling
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
         res.status(err.status)
    }
    return res.send({errorMessage: err.message })
})

app.listen(9000, () => {
    console.log("Server Up on Port 9000")
})