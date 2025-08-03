require('dotenv').config();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ExcelJS = require('exceljs'); 
const AccountModel = require('../models/account.model');
const { validCreateAccount } = require('../validations/account.valid');
const ErrorResponse = require('../helpers/ErrorResponse');
const sendMail = require('../helpers/send.mail');
const welcomeContent = require('../mail_content/welcome');

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    const account = await AccountModel.findOne({ username });

    if (!account) {
      // return res.status(400).json({
      //   statusCode: 400,
      //   message: 'TK hoặc MK không đúng',
      // });

      throw new ErrorResponse(400, 'TK hoặc MK không đúng');
    }

    const checkPass = bcryptjs.compareSync(password, account.password);

    if (!checkPass) {
      // return res.status(400).json({
      //   statusCode: 400,
      //   message: 'TK hoặc MK không đúng',
      // });

      throw new ErrorResponse(400, 'TK hoặc MK không đúng');
    }

    // jwt
    const payload = {
      _id: account._id,
      username: account.username,
      role: account.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });

    return res.status(200).json({
      ...payload,
      jwt: token,
      refreshToken,
    });
  },
  refreshToken: async (req, res) => {
    const { refreshToken } = req.body;

    const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const account = await AccountModel.findById(decode._id);
    if (!account) {
      throw new ErrorResponse(401, 'Hãy đăng nhập để tiếp tục');
    }

    const payload = {
      _id: account._id,
      username: account.username,
      role: account.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });

    return res.status(200).json({
      ...payload,
      jwt: token,
      refreshToken,
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

    sendMail({
      to: value.email,
      subject: 'Welcome to MANH HUNG STORE',
      html: welcomeContent(
        'http://localhost:5000/verify?token=abcsdadsfdsfsdafas',
      ),
    });

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
  exportExcelFileAccounts: async (req, res) => {
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

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Danh Sách Tài Khoản', {
      properties: { tabColor: { argb: 'FFC0000' }, defaultColWidth: 30 },
    });

    worksheet.columns = [
      { header: 'ID', key: '_id', width: 30 },
      { header: 'Tên Đăng Nhập', key: 'username', width: 30 },
      { header: 'Họ Tên', key: 'full_name', width: 30 },
      { header: 'Giới Tính', key: 'gender', width: 30 },
      { header: 'Quyền', key: 'role', width: 30 },
    ];

    accounts.forEach((account) => {
      worksheet.addRow(account);
    });

    //cách 1: lưu file vào server, sau đó stream file cho client
    // const timeNow = Date.now();
    // const filePath = `./assets/accounts-${timeNow}.xlsx`;
    // await workbook.xlsx.writeFile(filePath);

    // //stream file để client tải về
    // res.writeHeader(200, {
    //   "Content-Type": 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //   "Content-Disposition": `attachment; filename=accounts-${timeNow}.xlsx`,
    // });

    // const fileStream = fs.createReadStream(filePath);
    // fileStream.pipe(res);

    //cách 2: stream file trực tiếp mà không lưu vào server
    
    res.writeHeader(200, {
      'Content-Type':
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename=accounts-${Date.now()}.xlsx`,
    });
    
    await workbook.xlsx.write(res);
    res.end();
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
