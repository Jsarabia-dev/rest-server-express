/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { request, response } = require('express');
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const { saveFile } = require('../helpers');
const { User, Product } = require('../models');

const uploadFile = async (req = request, res = response) => {
  try {
    const tempFileName = await saveFile(req.files, 'folder', ['txt', 'md']);
    return res.status(200).send({ msg: tempFileName });
  } catch (msg) {
    return res.status(500).send({ msg });
  }
};

const updateImg = async (req = request, res = response) => {
  let model;
  const { id, collection } = req.params;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) res.status(400).send({ msg: `User with id: ${id} not exist` });
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) res.status(400).send({ msg: `Product with id: ${id} not exist` });
      break;

    default:
      return res.status(500).send({ msg: `Update imgage from CollectioName: ${collection} not active` });
  }

  // Delete old image
  if (model.img) {
    const pathImage = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(pathImage)) fs.unlinkSync(pathImage);
  }

  const imgName = await saveFile(req.files, collection, undefined);
  model.img = imgName;

  await model.save();

  res.json(model);
};

const updateImgCloudinary = async (req = request, res = response) => {
  let model;
  const { id, collection } = req.params;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) res.status(400).send({ msg: `User with id: ${id} not exist` });
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) res.status(400).send({ msg: `Product with id: ${id} not exist` });
      break;

    default:
      return res.status(500).send({ msg: `Update imgage from CollectioName: ${collection} not active` });
  }

  // Delete old image
  if (model.img) {
    const imageUrlSplit = model.img.split('/');
    const imageName = imageUrlSplit[imageUrlSplit.length - 1];
    const [public_id] = imageName.split('.');
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;
  await model.save();

  res.json(model);
};
const getImage = async (req = request, res = response) => {
  let model;
  const { id, collection } = req.params;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) res.status(400).send({ msg: `User with id: ${id} not exist` });
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) res.status(400).send({ msg: `Product with id: ${id} not exist` });
      break;

    default:
      return res.status(500).send({ msg: `Get image for the CollectioName: ${collection} not active` });
  }

  if (model.img) {
    const pathImage = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(pathImage)) return res.sendFile(pathImage);
  }

  const pathImageDefault = path.join(__dirname, '../public/assets', 'no-image.jpg');
  return res.sendFile(pathImageDefault);
};

module.exports = {
  uploadFile,
  updateImg,
  getImage,
  updateImgCloudinary,
};
