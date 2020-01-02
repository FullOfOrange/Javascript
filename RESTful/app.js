var createError = require('./node_modules/http-errors');
var express = require('./node_modules/express');
var path = require('path');
var cookieParser = require('./node_modules/cookie-parser');
var logger = require('./node_modules/morgan');
var helmet = require('./node_modules/helmet')

var usersRouter = require('./routes/users');
var restfulRouter = require('./routes/restful');
var staticRouter = require('./routes/staticdata');

var app = express();

//use helmet for sequrity
app.use(helmet());//Session이 Express인 것이 확인되는 것을 막아준다.(이것을 X-Powered-By 라고 하는 것 같음.)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', restfulRouter);
app.use('/users', usersRouter);
app.use('/static', staticRouter);

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
