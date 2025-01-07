const express = require('express')
const router = express.Router()
const registerDetails = require('../../Controllers/User/Register.js');

router.post('/register',registerDetails)

module.exports = router;