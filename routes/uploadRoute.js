const express = require('express')
const uploadRouter = express.Router()
const multerS3 = require('multer-s3')
const multer = require('multer')
const AWS = require('aws-sdk')
const Image = require('../models/Image')
require('dotenv').config()


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
})

const s3 = new AWS.S3()
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

uploadRouter.route("/")
.post(upload.single('image'),
(req, res, next) => {
    res.send(req.file.location)
    next()
})
.post((req, res, next) => {
    req.body.user = req.auth._id

    let newImage = new Image({
        imageUrl: req.file.location,
        user: req.auth._id
    })
    newImage.save()
        .then(image => res.send(image))
        .catch(err => next(err))
})

module.exports = uploadRouter