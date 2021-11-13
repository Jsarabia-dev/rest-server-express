/* eslint-disable no-promise-executor-return */
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const saveFile = (files, folder = '', extAllows = ['png', 'jpg', 'jpeg', 'gif']) => new Promise((resolve, reject) => {
  const { file } = files;
  const splitName = file.name.split('.');
  const fileExtension = splitName[splitName.length - 1];

  // Validate extension
  if (!extAllows.includes(fileExtension)) return reject(new Error(`Ext ${fileExtension} not allowed | Ext allowed: ${extAllows}`));

  const tempName = `${uuidv4()}.${fileExtension}`;

  // Save file in path
  const uploadPath = path.join(__dirname, `../uploads/${folder}/${tempName}`);
  file.mv(uploadPath, (err) => {
    if (err) return reject(new Error('Error saving the file...'));
    resolve(tempName);
  });
});

module.exports = { saveFile };
