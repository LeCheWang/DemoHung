const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    icon: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('category', categorySchema);
