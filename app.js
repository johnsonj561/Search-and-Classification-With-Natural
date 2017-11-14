var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var api = require('./routes/api');

// define express application and middleware
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
* Must access routes after they've been parsed
* Order of middleware is important
*/
app.use('/api', api);

// Single Page Application
app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


module.exports = app;
