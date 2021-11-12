/* eslint-disable no-console */
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt.helper');
const { googleVerify } = require('../helpers/google.verify.helper');

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
  const { idToken } = req.body;

  try {
    const { nombre, img, correo } = await googleVerify(idToken);

    let user = await User.findOne({ correo });

    if (!user) {
      const data = {
        nombre,
        correo,
        password: ':P',
        img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.estado) return res.status(401).json({ msg: 'Usuario no habilitado' });

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Invalid Token' });
  }
};

module.exports = {
  authLogin,
  authGoogle,
};
