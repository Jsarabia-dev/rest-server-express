/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const { request, response } = require('express');
const { Product } = require('../models');

const getProducts = async (req = request, res = response) => {
  // Params
  const {
    limit = 5,
    from = 0,
  } = req.query;

  const query = { status: true };

  const productFindPromise = Product.find(query)
    .populate('user', 'nombre')
    .populate('category', 'name')
    .skip(Number(from))
    .limit(Number(limit));

  const totalFindPromise = Product.countDocuments(query);

  const [total, products] = await Promise.all([
    totalFindPromise,
    productFindPromise,
  ]);

  res.json({
    total,
    products,
  });
};

const getProductById = async (req = request, res = response) => {
  const { id } = req.params;
  const productDB = await Product.findOne({ _id: id });
  if (!productDB) return res.status(400).json({ msg: `The product with ${id} NOT exist` });
  res.json(productDB);
};

const createProduct = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const productDB = await Product.findOne({ name });
  if (productDB) return res.status(400).json({ msg: `The product ${productDB.name} alredy exist` });

  const data = {
    ...req.body,
    name,
    user: req.userAuth._id,
  };
  const product = new Product(data);

  await product.save();
  res.status(201).json({ product });
};

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { user, ...data } = req.body;

  const productUpdated = await Product
    .findByIdAndUpdate(
      id,
      { name: data.name.toUpperCase(), data },
      { new: true },
    );

  res.json(productUpdated);
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const productDeleted = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

  res.json(productDeleted);
};

module.exports = {
  getProductById,
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
};
