const express = require('express')
const router = express.Router()
const {registerDetails, verifyOtp, addPassword} = require('../../Controllers/User/Register.js');

router.post('/register',registerDetails);

router.post('/verify-otp',verifyOtp);

router.post('/password',addPassword)

module.exports = router