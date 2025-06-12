const Joi = require('joi');

const createAccountSchema = Joi.object({
  username: Joi.string()
    .min(6)
    .message('Tài khoản tối thiểu 6 ký tự')
    .max(15)
    .message('Tài khoản tối đa là 15 ký tự')
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  full_name: Joi.string().required(),
  gender: Joi.string()
    .valid('male', 'female')
    .required(),
});

const updateAccountSchema = Joi.object({});

module.exports = {
  validCreateAccount: (body) => createAccountSchema.validate(body),
  validUpdateAccount: (body) => {},
};
