/* eslint-disable no-console */
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const userGet = async (req = request, res = response) => {
  // Params
  const {
    limit = 5,
    from = 0,
  } = req.query;

  const query = { estado: true };

  const userFindPromise = User.find(query)
    .skip(Number(from))
    .limit(Number(limit));

  const totalFindPromise = User.countDocuments(query);

  const [total, users] = await Promise.all([
    totalFindPromise,
    userFindPromise,
  ]);

  res.json({
    total,
    users,
  });
};

const userPost = async (req = request, res = response) => {
  const {
    nombre,
    // google,
    // nuevoCampo,
    correo,
    password,
    rol,
  } = req.body;

  const user = new User({
    nombre, correo, password, rol,
  });

  // Encriptar Passw
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save on DB
  await user.save();

  res.json({
    user,
  });
};

const userPut = async (req = request, res = response) => {
  const { id } = req.params;
  const {
    password, google, correo, ...rest
  } = req.body;

  if (password) {
    // Encriptar Passw
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    user,
  });
};

const userDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const { userAuth } = req;

  console.log(userAuth);

  const userDeleted = await User.findByIdAndUpdate(id, { estado: false });

  res.json({
    userDeleted,
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
