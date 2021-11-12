
const fieldsValidator = require('../middlewares/validator.middleware');
const jwtValidator = require('../middlewares/validator-jwt.middlewares');
const roleValidator = require('../middlewares/validator-roles-middlewares');

module.exports = {
    ...fieldsValidator,
    ...jwtValidator,
    ...roleValidator
}