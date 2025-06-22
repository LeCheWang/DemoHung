const express = require('express');
const router = express.Router();

const {
  login,
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
  getAccountById,
  refreshToken,
} = require('../controllers/account.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router
  .route('/')
  .post(createAccount)
  .get(
    asyncMiddleware(authMiddleware),
    roleMiddleware('admin'),
    asyncMiddleware(getAccounts),
  );

router.route('/login').post(asyncMiddleware(login));

router.route('/refresh-token').post(asyncMiddleware(refreshToken));

router
  .route('/:id')
  .patch(asyncMiddleware(authMiddleware), asyncMiddleware(updateAccount))
  .delete(deleteAccount)
  .get(getAccountById);

module.exports = router;
