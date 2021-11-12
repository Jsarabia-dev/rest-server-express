const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    default: 'USER_ROLE',
    eunm: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () { // function normal para utilizar contexto "this"
  const {
    __v, password, _id, ...usuario
  } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model('User', UserSchema);
