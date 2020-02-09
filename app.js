/* eslint-disable func-names */
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const debug = require('debug')('app');
const indexRouter = require('./routes/index');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || '5000';
// const db = require('./models/index');
const { sequelize } = require('./config/db-config');


(async function () {
  try {
    await sequelize.authenticate();
    debug('connected to Db......');
  } catch (err) {
    debug(`db error: ${err}`);
  }
}());


app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('tiny'));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS, DELETE');
  next();
});

// app.use('/media', express.static(path.join(__dirname, 'media')));
// app.use('/product-images', express.static(path.join(__dirname, 'media/product-images')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(port, () => {
  debug(`Listening on port ${port}.....`);
});


module.exports = app;
