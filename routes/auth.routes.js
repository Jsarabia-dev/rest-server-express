const { Router } = require('express');
const { check } = require('express-validator');

const { authLogin, authGoogle } = require('../controllers/auth.controller');

const { fieldsValidator } = require('../middlewares/validator.middleware');

const router = Router();

router.post(
  '/login',
  [
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El password es olbigatorio').not().isEmpty(),
    fieldsValidator,
  ],
  authLogin,
);

router.post(
  '/google',
  [
    check('id_token', 'Token de google es necesario').not().isEmpty(),
    fieldsValidator,
  ],
  authGoogle,
);

module.exports = router;
