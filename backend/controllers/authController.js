const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const normalizeEmail = (email) => String(email || '').trim().toLowerCase();
const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const safeUser = (user) => ({ _id: user._id, name: user.name, email: user.email, role: user.role, college: user.college || '', avatar: user.avatar || '' });

exports.register = async (req, res) => {
  try {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = normalizeEmail(req.body.email);
    const password = req.body.password;
    const college = typeof req.body.college === 'string' ? req.body.college.trim() : '';
    if (!name || name.length > 100 || !validEmail(email) || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ message: 'Enter a valid name, email, and a password with at least 6 characters.' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'An account with this email already exists. Please sign in.' });
    const user = await User.create({ name, email, password, college, emailVerified: true });
    return res.status(201).json({ ...safeUser(user), token: generateToken(user._id), message: 'Account created.' });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'Account already exists.' });
    console.error('[AUTH] Register failed:', error.message);
    return res.status(500).json({ message: 'Registration failed.' });
  }
};

exports.login = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = req.body.password;
    if (!validEmail(email) || typeof password !== 'string' || !password) return res.status(400).json({ message: 'Enter your email and password.' });
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid email or password.' });
    if (user.emailVerified !== true) { user.emailVerified = true; await user.save(); }
    return res.json({ ...safeUser(user), token: generateToken(user._id) });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed.' });
  }
};

exports.verifyEmail = async (req, res) => res.json({ message: 'Verification disabled for demo.' });
exports.resendVerification = async (req, res) => res.json({ message: 'Verification disabled for demo.' });
exports.forgotPassword = async (req, res) => res.status(503).json({ message: 'Password reset disabled for demo.' });
exports.resetPassword = async (req, res) => res.status(503).json({ message: 'Password reset disabled for demo.' });
exports.getMe = async (req, res) => res.json(safeUser(req.user));