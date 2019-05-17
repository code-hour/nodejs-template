const swaggerUi = require('swagger-ui-express');
// TODO: Swagger.json is from web as a sample. Will need to edit it.
const swaggerDocument = require('../docs/swagger.json');

const TestRoute = require('./test-route');

module.exports = (app) => {
  app.use(
    process.env.API_VERSION,
    TestRoute,
  );

  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { customCss: '.swagger-ui .topbar { display: none }', explorer: true })
  );
};
