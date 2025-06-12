const bcryptjs = require('bcryptjs');
const AccountModel = require('../models/account.model');
const { validCreateAccount } = require('../validations/account.valid');

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    const account = await AccountModel.findOne({ username });

    if (!account) {
      return res.status(400).json({
        statusCode: 400,
        message: 'TK hoặc MK không đúng',
      });
    }

    const checkPass = bcryptjs.compareSync(password, account.password);

    if (!checkPass) {
      return res.status(400).json({
        statusCode: 400,
        message: 'TK hoặc MK không đúng',
      });
    }

    // jwt

    return res.status(200).json({
      statusCode: 200,
      message: 'Đăng nhập thành công',
    });
  },
  createAccount: async (req, res) => {
    const body = req.body;

    //validate the body
    const { value, error } = validCreateAccount(body);

    if (error) {
      return res.status(400).json({
        statusCode: 400,
        message: error.message,
      });
    }

    const account = await AccountModel.create(value);

    return res.status(201).json(account);
  },
  getAccounts: async (req, res) => {
    const { username, gender } = req.query;
    // destructuring là gì?

    const bodyQuery = {};
    if (username) {
      bodyQuery.username = { $regex: `.*${username}.*`, $options: 'i' }; // i là không phân biệt hoa thường
    }

    if (gender) {
      bodyQuery.gender = gender;
    }

    const accounts = await AccountModel.find(bodyQuery);

    return res.status(200).json(accounts);
  },
  updateAccount: async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    //validate the body

    const account = await AccountModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return res.status(200).json(account);
  },
  deleteAccount: async (req, res) => {
    const { id } = req.params;

    const account = await AccountModel.findByIdAndDelete(id);

    return res.status(200).json(account);
  },
  getAccountById: async (req, res) => {
    const { id } = req.params;

    const account = await AccountModel.findById(id);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    return res.status(200).json(account);
  },
};
