const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFile } = require('../controllers/uploads.controller');
const { fieldsValidator } = require('../middlewares/validator.middleware');

const router = Router();

router.post(
  '/',
  [
    // check('correo', 'El correo no es valido').isEmail(),
    // check('password', 'El password es olbigatorio').not().isEmpty(),
    // fieldsValidator,
  ],
  uploadFile,
);

module.exports = router;
