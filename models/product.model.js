const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
  name: {
    type: String,
    required: [true, 'El name es obligatorio'],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: { type: String },
  disponible: { type: Boolean, defult: true },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model('Product', ProductoSchema);
