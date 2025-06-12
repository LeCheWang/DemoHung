const accountRouter = require('./account.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');

module.exports = (app) => {
  app.use('/api/accounts', accountRouter);
  app.use('/api/categories', categoryRouter);
  app.use('/api/products', productRouter);
};
  