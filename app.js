const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cron = require('node-cron');

const ping = require('./lib/ping')
const speed = require('./lib/speed')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const createPing = require('./handlers/create-ping')
const createSpeed = require('./handlers/create-speed')

const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/monitor', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', (err) => {
    console.log('connection error:', err);
    process.exit(1);
});
db.once('open', () => {
    console.log('Connected to MongoDB (via Mongoose)');
});

cron.schedule('0 * * * * *', () => {
  const minutes = new Date().getMinutes()

  ping().then(response => {
    createPing(response);

    // check speed every 10 minutes
    if (minutes % 10 === 0) {
      speed().then(response => {
        createSpeed(response);
      })
    }
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
