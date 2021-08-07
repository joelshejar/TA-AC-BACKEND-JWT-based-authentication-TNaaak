var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
require('dotenv.config')
var Book = require("./models/Book");
var Comment = require("./models/Comment");
var auth = require("./middlewares/auth");

var indexRouter = require("./routes/index");
var booksRouter = require("./routes/books");
var commentRouter = require("./routes/comment");
var userRouter = require("./routes/user");

mongoose.connect(
  "mongodb://localhost/book-api",
  {useNewUrlParser:true, useUnifiedTopology:true},
  (err)=>{
    console.log(err?err:'connected to database')
  }
)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", indexRouter);
app.use("/api/books", booksRouter);
app.use("/api/comment", commentRouter);
app.use("/api/users", userRouter);

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