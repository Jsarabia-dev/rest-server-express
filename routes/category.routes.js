const { Router } = require('express');
const { check } = require('express-validator');

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');

const { categoryExistByID, userExistByID, isValidRole } = require('../helpers/db-validators.helper');

const { fieldsValidator, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

router.get(
  '/',
  getCategories,
);

router.get(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(categoryExistByID),
    fieldsValidator,
  ],
  getCategoryById,
);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'name is mandatory').not().isEmpty(),
    fieldsValidator,
  ],
  createCategory,
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'ID no valid').isMongoId(),
    check('name', 'name is mandatory').not().isEmpty(),
    check('id').custom(categoryExistByID),
    fieldsValidator,
  ],
  updateCategory,
);

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'ID is mandatory').not().isEmpty(),
    check('id', 'ID no valid').isMongoId(),
    check('id').custom(categoryExistByID),
    fieldsValidator,
  ],
  deleteCategory,
);

module.exports = router;
