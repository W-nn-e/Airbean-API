const { UserModel } = require('../models/userModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwtSecret = process.env.JWT_SECRET;

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error('Invalid email address');
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error('Email address is already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ name, email, password: hashedPassword });
    res.status(201).json({
      status: 'success',
      message: 'New user successfully created',
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: '1h',
    });
    res.status(200).json({
      status: 'success',
      id: user._id,
      token,
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};
