const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const {
  userGet,
  userPost,
  userPut,
  userDelete,
} = require('../controllers/user.controller');

// Middlewares
const {
  fieldsValidator,
  validateJWT,
  hasRole,
} = require('../middlewares');

// Helpers
const { isValidRole, isEmailExist, userExistByID } = require('../helpers/db-validators.helper');

const router = Router();

router.get('/', userGet);

router.post(
  '/',
  [
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(isEmailExist),
    check('rol').custom(isValidRole),
    fieldsValidator,
  ],
  userPost,
);

router.put(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userExistByID),
    check('rol').custom(isValidRole),
    fieldsValidator,
  ],
  userPut,
);

router.delete(
  '/:id',
  [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'SELL_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userExistByID),
    fieldsValidator,
  ],
  userDelete,
);

module.exports = router;
