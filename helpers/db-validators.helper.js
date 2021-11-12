const Role = require('../models/role.model');
const User = require('../models/user.model');

const isValidRole = async (rol = '') => {
  const rolExist = await Role.findOne({ rol });
  if (!rolExist) {
    throw new Error(`El rol ${rol} no existe`);
  }
};

const isEmailExist = async (correo = '') => {
  // Verificar si correo existe
  const isExist = await User.findOne({ correo });
  if (isExist) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

const userExistByID = async (id) => {
  // Verificar si correo existe
  const isExist = await User.findById(id);
  if (!isExist) {
    throw new Error(`El User con id ${id} NO existe`);
  }
};

module.exports = {
  isValidRole,
  isEmailExist,
  userExistByID,
};
