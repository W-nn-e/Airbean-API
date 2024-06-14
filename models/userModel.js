const mongoose = require('mongoose');
const { OrderSchema } = require('./orderModel');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  orders: [OrderSchema],
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = {
  UserSchema,
  UserModel,
};
