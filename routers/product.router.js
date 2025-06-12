const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProducts,
} = require('../controllers/product.controller');

router.route('/').post(createProduct).get(getProducts);

module.exports = router;
