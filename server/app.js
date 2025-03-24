var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


app.use('/product', require('./routes/productRoutes'));
app.use('/user', require('./routes/userRoutes'));


module.exports = app;

//AAAAA