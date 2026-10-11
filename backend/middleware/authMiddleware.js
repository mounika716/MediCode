const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select(
  '-password -emailVerificationOtpHash -emailVerificationOtpExpires -passwordResetOtpHash -passwordResetOtpExpires'
);
      return next();
    } catch {
      res.status(401);
      return next(new Error('Not authorized, token failed'));
    }
  }
  res.status(401);
  next(new Error('Not authorized, no token'));
};

module.exports = { protect };