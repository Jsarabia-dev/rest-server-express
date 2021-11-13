const {
  Category, User, Role, Product,
} = require('../models');

/* Roles validator */
const isValidRole = async (rol = '') => {
  const rolExist = await Role.findOne({ rol });
  if (!rolExist) {
    throw new Error(`El rol ${rol} no existe`);
  }
};

/* User validator */
const isEmailExist = async (correo = '') => {
  const isExist = await User.findOne({ correo });
  if (isExist) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

const userExistByID = async (id) => {
  const isExist = await User.findById(id);
  if (!isExist) {
    throw new Error(`El User con id ${id} NO existe`);
  }
};

/* Category validator */
const categoryExistByID = async (id) => {
  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new Error(`The category ${id} not exist`);
  }
};

/* Products validator */
const productExistByID = async (id) => {
  const isExist = await Product.findById(id);
  if (!isExist) {
    throw new Error(`The Product with id ${id} not exist`);
  }
};

module.exports = {
  isValidRole,
  isEmailExist,
  userExistByID,
  categoryExistByID,
  productExistByID,
};
