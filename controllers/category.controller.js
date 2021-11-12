/* eslint-disable no-underscore-dangle */
const { request, response } = require('express');
const { Category } = require('../models');

const getCategories = async (req = request, res = response) => {
  // Params
  const {
    limit = 5,
    from = 0,
  } = req.query;

  const query = { status: true };

  const categoryFindPromise = Category.find(query)
    .populate('user', 'nombre')
    .skip(Number(from))
    .limit(Number(limit));

  const totalFindPromise = Category.countDocuments(query);

  const [total, categories] = await Promise.all([
    totalFindPromise,
    categoryFindPromise,
  ]);

  res.json({
    total,
    categories,
  });
};

const getCategoryById = async (req = request, res = response) => {
  const { id } = req.params;
  const categoryDB = await Category.findOne({ _id: id });
  if (!categoryDB) return res.status(400).json({ msg: `The category with ${id} NOT exist` });
  res.json(categoryDB);
};

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDB = await Category.findOne({ name });
  if (categoryDB) return res.status(400).json({ msg: `The category ${categoryDB.name} alredy exist` });
  const data = {
    name,
    user: req.userAuth._id,
  };
  const category = new Category(data);
  await category.save();
  res.status(201).json({ category });
};

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, status } = req.body;

  const categoryUpdated = await Category
    .findByIdAndUpdate(
      id,
      { name: name.toUpperCase(), status },
      { new: true },
    );

  res.json(categoryUpdated);
};

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { userAuth } = req;

  const categoryDeleted = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

  res.json(categoryDeleted);
};

module.exports = {
  getCategoryById,
  createCategory,
  updateCategory,
  getCategories,
  deleteCategory,
};
