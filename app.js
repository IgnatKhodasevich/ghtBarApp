let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let hbs = require('express-handlebars');
let session = require('express-session');
let expressValidator = require('express-validator');
let passport = require('passport');
let favicon = require('serve-favicon');
let flash = require('connect-flash');
let env = require('prod');

// Init
let app = express();

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

////DataBase Init////

//Models
let models = require('./models');

//Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

// view engine setup
app.engine('hbs', hbs({extname: '.hbs', defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.ico')));

app.use(logger('dev'));
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'public')));

/// Routes
app.get('/', function(req, res) {
    res.render('signin', { title: 'ghT Bar' });
});

// express session
app.use(session({
    cookie: { maxAge: process.env.SESSION_TIMEOUT},
    secret: 'lolly bomb',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//load passport strategies
require('./config/passport.js')(passport, models.user);

let authRoute = require('./routes/auth.js')(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('.env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3030, function () {
    console.log('Server started on port ' + app.get('port'));
});

module.exports = app;
