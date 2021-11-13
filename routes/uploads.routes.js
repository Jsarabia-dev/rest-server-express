const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFile, getImage, updateImgCloudinary } = require('../controllers/uploads.controller');
const { validateAllowedCollection } = require('../helpers');
const { fieldsValidator, validateUploadFile } = require('../middlewares');

const router = Router();

router.post(
  '/',
  [
    validateUploadFile,
    fieldsValidator,
  ],
  uploadFile,
);

router.put(
  '/:collection/:id',
  [
    validateUploadFile,
    check('id', 'ID not valid').isMongoId(),
    check('collection').custom((c) => validateAllowedCollection(c, ['users', 'products'])),
    fieldsValidator,
  ],
  updateImgCloudinary,
);

router.get(
  '/:collection/:id',
  [
    check('id', 'ID not valid').isMongoId(),
    check('collection').custom((c) => validateAllowedCollection(c, ['users', 'products'])),
    fieldsValidator,
  ],
  getImage,
);

module.exports = router;
