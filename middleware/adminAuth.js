const { UserModel } = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.isAdmin = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }
  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token: User not found' });
    }
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized: Admin role required' });
    }
    req.user = user;
    next();
  } catch (e) {
    if (e.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      return res.status(500).json({ error: 'Server error' });
    }
  }
};
