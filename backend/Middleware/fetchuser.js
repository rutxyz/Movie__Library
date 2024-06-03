// middleware/fetchuser.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const fetchuser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ errors: 'Please authenticate using a valid token' });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(data.userId).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ errors: 'Please authenticate using a valid token' });
  }
};

module.exports = fetchuser;
