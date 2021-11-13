/* eslint-disable consistent-return */
const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const {
  Category, User, Product,
} = require('../models');

const permittedCollections = [
  'users',
  'categories',
  'products',
  'roles',
];

const searchUser = async (term = '', res = response) => {
  // Seearch by ID
  if (ObjectId.isValid(term)) {
    const user = await User.findById(term);
    return res.json({ results: (user) ? [user] : [] });
  }

  // Seearch by NAME o EMAIL
  const regex = new RegExp(term, 'i'); // Insensible a mayusc
  if (term) {
    const users = await User.find({
      $or: [{ nombre: regex }, { correo: regex }],
      $and: [{ estaus: true }],
    });
    return res.json({ results: users });
  }
};

const searchCategories = async (term = '', res = response) => {
  // Seearch by ID
  if (ObjectId.isValid(term)) {
    const category = await Category.findById(term);
    return res.json({ results: (category) ? [category] : [] });
  }

  // Seearch by NAME
  const regex = new RegExp(term, 'i'); // Insensible a mayusc
  if (term) {
    const categories = await Category.find({
      $or: [{ name: regex }],
      $and: [{ status: true }],
    });
    return res.json({ results: categories });
  }
};

const searchProducts = async (term = '', res = response) => {
  // Seearch by ID
  if (ObjectId.isValid(term)) {
    const product = await Product.findById(term).populate('category', 'name');
    return res.json({ results: (product) ? [product] : [] });
  }

  // Seearch by NAME o EMAIL
  const regex = new RegExp(term, 'i'); // Insensible a mayusc
  if (term) {
    const products = await Product.find({
      $or: [{ name: regex }],
      $and: [{ status: true }],
    })
      .populate('category', 'name');
    return res.json({ results: products });
  }
};

const search = async (req = request, res = response) => {
  const { collection, term } = req.params;
  if (!permittedCollections.includes(collection)) return res.status(400).json({ msg: `The permite collections are: ${permittedCollections}` });

  switch (collection) {
    case 'users':
      searchUser(term, res);
      break;

    case 'categories':
      searchCategories(term, res);
      break;

    case 'products':
      searchProducts(term, res);
      break;

    default:
      return res.status(500).json({ msg: `Search with collection: ${collection.toUpperCase()} is not active` });
  }
};

module.exports = {
  search,
};
