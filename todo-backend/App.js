const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const router = express.Router();
mongoose.Promise = global.Promise;
// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    // Pass to next layer of middleware
    next();
});
const routes = require('./routes');
app.use('/api',routes);

//public dir
app.use(express.static('public'))
//serve bundle react
app.use('/', (req,res,next)=>{
  res.status(200).sendFile(path.resolve(__dirname, "public", "index.html"));
})

module.exports = app;
