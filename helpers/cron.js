const { CronJob } = require('cron');
const ProductModel = require('../models/product.model');

const jobRemoveProduct = new CronJob(
  '30 0,15,30,55 16 * * *', // cronTime
  async function () {
    // const accounts = await AccountModel.find({is_active: 0});

    await ProductModel.deleteMany();
    console.log('delete all product');
  }, // onTick
  null, // onComplete
  true, // start
  'Asia/Ho_Chi_Minh', // timeZone
);

module.exports = {
  jobRemoveProduct,
};
