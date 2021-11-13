const fieldsValidator = require('./validator.middleware');
const jwtValidator = require('./validator-jwt.middlewares');
const roleValidator = require('./validator-roles-middlewares');
const fileValidator = require('./validator-files.middleware');

module.exports = {
  ...fieldsValidator,
  ...jwtValidator,
  ...roleValidator,
  ...fileValidator,
};
