require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')


/* Database connection */
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('[LOG] Connected to database.'))

/* Routers */ 
var homeRouter = require('./routes/home');
const recipesRouter = require('./routes/recipes')

/* Models*/
const Recipe = require('./models/recipe').Recipe

var app = express();

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/* Adds /images/uploads to static folders that can be accessed */
app.use('/images/uploads', express.static('/images/uploads'))

app.use('/home', homeRouter);
app.use("/recipes", recipesRouter)

app.use(function(req, res){
  res.redirect("/home/");
});

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

app.listen(9999, () => console.log("[LOG] RecipesManager just started !"))

module.exports = app;
