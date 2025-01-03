const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const register = require('./Routers/User/Register.js')
const connection = require('./Components/Connection.js')

connection()
app.use(cors())
app.use(bodyParser.json())

app.use('/user',register)

module.exports = app;