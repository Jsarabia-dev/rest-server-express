const { request, response } = require('express');

const isAdminRole = (req, res, next) => {
  if (!req.userAuth) return res.status(401).json({ msg: 'userAuth not exist' });

  const { rol, nombre } = req.userAuth;

  if (rol !== 'ADMIN_ROLE') return res.status(401).json({ msg: `El usuario ${nombre} NO es ADMIN_ROLE` });

  next();
};

const isRole = async (req = request, res = response, next) => {
  if (!req.userAuth) return res.status(401).json({ msg: 'userAuth not exist' });
  const { rol, nombre } = req.userAuth;
  if (rol !== 'ADMIN_ROLE') return res.status(401).json({ msg: `El usuario ${nombre} NO es ADMIN_ROLE` });
  next();
};

module.exports = {
  isAdminRole,
  isRole,
};
