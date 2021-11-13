const { Router } = require('express');
const { check } = require('express-validator');

const { search } = require('../controllers/search.controller');

const { categoryExistByID, isValidRole, productExistByID } = require('../helpers/db-validators.helper');

const { fieldsValidator, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

router.get(
  '/:collection/:term',
  search,
);

module.exports = router;
