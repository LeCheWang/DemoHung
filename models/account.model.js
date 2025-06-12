const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const accountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

accountSchema.pre('save', function (next) {
  const account = this;

  if (account.password) {
    account.password = bcryptjs.hashSync(account.password, 10);
  }

  next();
});

module.exports = mongoose.model('account', accountSchema);
