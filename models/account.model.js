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
 
accountSchema.pre('findOneAndUpdate', function (next) {
  const account = { ...this.getUpdate() };
  if (account.password) {
    account.password = bcryptjs.hashSync(
      account.password,
      10,
    );
  }

  this.setUpdate(account);

  next();
});

accountSchema.pre('findByIdAndUpdate', function (next) {
  const account = { ...this.getUpdate() };
  if (account.password) {
    account.password = bcryptjs.hashSync(
      account.password,
      10,
    );
  }

  this.setUpdate(account);

  next();
});

accountSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
  },
});

module.exports = mongoose.model('account', accountSchema);
