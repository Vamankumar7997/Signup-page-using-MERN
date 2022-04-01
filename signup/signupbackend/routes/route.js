const express = require('express')
const router = express.Router()
const signupPageCopy = require('../models/signupmodels')
const bcrypt = require('bcrypt')

router.post("/signup", async (request, response) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    const signedUpUser = new signupPageCopy({
        fullName: request.body.fullName,
        username: request.body.username,
        email: request.body.email,
        password: securePassword
    })
    signedUpUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})

router.get('/signin')
module.exports = router;