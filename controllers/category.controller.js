const CategoryModel = require('../models/category.model');

module.exports = {
  createCategory: async (req, res) => {
    const body = req.body;

    const category = await CategoryModel.create(body);

    return res.status(201).json(category);
  },
  getCategories: async (req, res) => {
    const categories = await CategoryModel.find();

    return res.status(200).json(categories);
  },
};
