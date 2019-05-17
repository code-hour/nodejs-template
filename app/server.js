const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const responseTime = require('response-time');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
// TODO: Swagger.json is from web as a sample. Will need to edit it.
const swaggerDocument = require('./docs/swagger.json');

// Default node environment if the environment variable is missing
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const logger = require('./lib/logger');
const requestLogger = require('./lib/logger/request-logger');

const app = express();

app.enable('trust proxy');

// Secure express app
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
// Enable All CORS Requests
app.use(cors());
// Add response time in headers
app.use(responseTime());

// Logs
app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Application Started!').end();
});

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
  logger.info(`We are live on ${PORT}`);
});

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss: '.swagger-ui .topbar { display: none }', explorer: true })
);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.setHeader('User', 'Invalid');
  res.status(404).send({
    code: 404,
    description: 'Requested path not found',
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err);
  next(err);
});
