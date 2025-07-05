const express = require('express');
const router = express.Router();

const upload = require('../helpers/upload');

const {
  createCategory,
  getCategories,
} = require('../controllers/category.controller');

const asyncMiddleware = require('../middlewares/async.middleware');

router
  .route('/')
  .post(
    upload.fields([
      { name: 'icon', maxCount: 10 },
      { name: 'icon2', maxCount: 1 },
    ]),
    asyncMiddleware(createCategory),
  )
  .get(asyncMiddleware(getCategories));

module.exports = router;
