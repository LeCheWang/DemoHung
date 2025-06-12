const { PER_PAGE } = require('../constants/common');
const Paging = require('../helpers/paging');
const ProductModel = require('../models/product.model');

module.exports = {
  createProduct: async (req, res) => {
    const body = req.body;

    const product = await ProductModel.create(body);

    return res.status(201).json(product);
  },
  getProducts: async (req, res) => {
    const {
      category_id,
      name,
      min_price,
      max_price,
      limit = PER_PAGE,
      page = 1,
    } = req.query;

    const bodyQuery = {};

    if (category_id) {
      bodyQuery.category_id = category_id;
    }

    if (name) {
      bodyQuery.name = {
        $regex: `.*${name}.*`,
        $options: 'i',
      };
    }

    if (min_price && max_price) {
      bodyQuery.price = {
        $gte: min_price,
        $lte: max_price,
      };
    }

    // const products = await ProductModel.find(bodyQuery)
    //   .limit(limit)
    //   .skip(limit * (page - 1))
    //   .sort({ createdAt: -1 });

    const products = await Paging(
      ProductModel,
      limit,
      page,
      bodyQuery,
      [],
      { createdAt: -1 },
    );

    return res.status(200).json(products);
  },
  updateProduct: () => {},
  deleteProduct: () => {},
  getProductById: () => {},
};
