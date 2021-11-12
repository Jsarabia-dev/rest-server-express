/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validateJWT = async (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No existe Token',
    });
  }

  try {
    // Find user authenticated
    const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
    const userAuth = await User.findById({ _id: uid });

    // Validate userAuth
    if (!userAuth) return res.status(401).json({ msg: 'Token no valido - User not exist' });
    if (!userAuth.estado) return res.status(401).json({ msg: 'Token no valido - User status: false' });

    req.userAuth = userAuth;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: 'Not valid Token',
    });
  }
};

module.exports = {
  validateJWT,
};
