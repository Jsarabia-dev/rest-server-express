const { request, response } = require('express');

const isAdminRole = (req, res, next) => {
  if (!req.userAuth) return res.status(401).json({ msg: 'userAuth not exist' });

  const { rol, nombre } = req.userAuth;

  if (rol !== 'ADMIN_ROLE') return res.status(401).json({ msg: `El usuario ${nombre} NO es ADMIN_ROLE` });

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {

    if (!roles.includes(req.userAuth.rol)) return res.status(401).json({ msg: `El servicio requiere uno de estos roles: ${roles}` })

    next();
  }
};

module.exports = {
  isAdminRole,
  hasRole,
};
