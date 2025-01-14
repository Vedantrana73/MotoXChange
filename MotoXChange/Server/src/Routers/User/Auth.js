const express = require('express')
const router = express.Router()
const {registerDetails, verifyOtp} = require('../../Controllers/User/Register.js');

router.post('/register',registerDetails);

router.post('/verify-otp',verifyOtp);

module.exports = router