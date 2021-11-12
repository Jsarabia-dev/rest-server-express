/* eslint-disable no-console */
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt.helper');

const authLogin = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const user = await User.findOne({ correo });

    // Validate is exist by correo
    if (!user) return res.status(400).json({ msg: 'Usuario / Password no son correctos - correo' });

    // Validate is user active status
    if (!user.estado) return res.status(400).json({ msg: 'Usuario / Password no son correctos - estado: false' });

    // Validate Password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) return res.status(400).json({ msg: 'Usuario / Password no son correctos - Password: invalid' });

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error in login' });
  }
};

const authGoogle = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    

    res.json({
      msg: 'Todo OK',
      id_token,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error in login' });
  }
};

module.exports = { 
  authLogin,
  authGoogle,
};
