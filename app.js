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
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const indexRouter = require('./routes/index');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Zicli Mock-up API',
      version: '1.0.0',
      description: 'Shopping API for buying and selling products',
      contact: 'email: razaqfatiu@gmail.com',
    },
    servers: ['http://localhost:4444'],
    host: 'http://localhost:4444',
    basePath: '/api/v1',
  },
  apis: ['./routes/*.js'],
};


const app = express();
const server = http.createServer(app);
const port = process.env.PORT || '5000';
// const db = require('./models/index');
const { sequelize } = require('./config/db-config');

// const swaggerDocs = require('./swagger.json');
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/v1/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

app.use('/media', express.static(path.join(__dirname, 'media')));
app.use('/product-images', express.static(path.join(__dirname, 'media/product-images')));

app.use('/api/v1', indexRouter);

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
