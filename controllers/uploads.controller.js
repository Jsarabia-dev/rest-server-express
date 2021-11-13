/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { request, response } = require('express');

const { saveFile } = require('../helpers');

const uploadFile = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).send('No files were uploaded.');
  }

  try {
    const tempFileName = await saveFile(req.files, 'folder', ['txt', 'md']);
    return res.status(200).send({ msg: tempFileName });
  } catch (msg) {
    return res.status(500).send({ msg });
  }
};
module.exports = {
  uploadFile,
};
