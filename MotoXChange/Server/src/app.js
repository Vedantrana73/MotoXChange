const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const auth = require('./Routers/User/Auth.js')
const connection = require('./Components/Connection.js')

connection()
app.use(cors())
app.use(bodyParser.json())

app.use('/user',auth)

module.exports = app;