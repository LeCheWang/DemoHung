const express = require('express');
const router = express.Router();

const {
  login,
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
  getAccountById,
} = require('../controllers/account.controller');

router.route('/').post(createAccount).get(getAccounts);

router.route('/login').post(login);

router
  .route('/:id')
  .patch(updateAccount)
  .delete(deleteAccount)
  .get(getAccountById);

module.exports = router;
