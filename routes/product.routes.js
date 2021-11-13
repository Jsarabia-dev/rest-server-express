const { Router } = require('express');
const { check } = require('express-validator');

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

const { categoryExistByID, productExistByID } = require('../helpers/db-validators.helper');

const { fieldsValidator, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

router.get(
  '/',
  getProducts,
);

router.get(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(productExistByID),
    fieldsValidator,
  ],
  getProductById,
);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'name is mandatory').not().isEmpty(),
    check('category', 'ID no valid').isMongoId(),
    check('category').custom(categoryExistByID),
    fieldsValidator,
  ],
  createProduct,
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'ID no valid').isMongoId(),
    check('id').custom(productExistByID),
    fieldsValidator,
  ],
  updateProduct,
);

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'ID is mandatory').not().isEmpty(),
    check('id', 'ID no valid').isMongoId(),
    check('id').custom(productExistByID),
    fieldsValidator,
  ],
  deleteProduct,
);

module.exports = router;
