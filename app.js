const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs=require('ejs');
const engine=require('ejs-mate');
const validator=require('express-validator');
const session=require('express-session');
const MySQLStore=require('express-mysql-session')(session);
const passport=require('passport');
const flash=require('connect-flash');


const database=require('./util/database');
const dboptions=require('./util/dboptions');
require('./config/passport');
const User=require('./models/user');

const routes = require('./routes/index');
const users = require('./routes/users');


const sessionStore=new MySQLStore(dboptions.options);
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs',engine);
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(validator());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret:'express node.js framework',
    saveUninitialized:false,
    resave:false,
    store:sessionStore
}));


app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// var setCookie = cookie.serialize('foo', 'bar');
// console.log(setCookie.split('='));

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
