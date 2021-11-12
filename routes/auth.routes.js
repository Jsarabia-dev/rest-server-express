const { Router } = require('express');
const { check } = require('express-validator');

const { authLogin } = require('../controllers/auth.controller');

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

module.exports = router;
