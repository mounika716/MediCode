const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { sendOtpEmail } = require('../utils/emailService');

const hashOtp = (otp) =>
  crypto.createHash('sha256').update(otp).digest('hex');

const createOtp = () => crypto.randomInt(100000, 1000000).toString();
const expiryDate = () => new Date(Date.now() + 10 * 60 * 1000);
const normalizeEmail = (email) => String(email || '').trim().toLowerCase();
const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const safeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  college: user.college || '',
  avatar: user.avatar || '',
});

async function sendVerificationCode(user) {
  const otp = createOtp();

  user.emailVerificationOtpHash = hashOtp(otp);
  user.emailVerificationOtpExpires = expiryDate();
  await user.save();

  try {
    const info = await sendOtpEmail({
      to: user.email,
      otp,
      purpose: 'verification',
    });

    console.log(
      `[AUTH] Verification email submitted for ${user.email}; messageId=${info.messageId || 'n/a'}`
    );

    return { emailed: true };
  } catch (error) {
    console.error(
      '[AUTH] Verification email could not be submitted:',
      error.code || '',
      error.message
    );

    // ─────────────────────────────────────────────────────────────
    // DEMO FALLBACK: if email fails, auto-verify the user so they
    // can still sign in. Registration must never block on email.
    // ─────────────────────────────────────────────────────────────
    user.emailVerified = true;
    user.emailVerificationOtpHash = undefined;
    user.emailVerificationOtpExpires = undefined;
    await user.save().catch((saveError) =>
      console.error('[AUTH] Could not auto-verify user:', saveError.message)
    );

    console.warn(`[AUTH] Auto-verified ${user.email} due to email failure`);

    return { emailed: false };
  }
}

exports.register = async (req, res) => {
  try {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = normalizeEmail(req.body.email);
    const password = req.body.password;
    const college = typeof req.body.college === 'string' ? req.body.college.trim() : '';

    if (
      !name ||
      name.length > 100 ||
      !validEmail(email) ||
      typeof password !== 'string' ||
      password.length < 6
    ) {
      return res.status(400).json({
        message: 'Enter a valid name and email, and a password with at least 6 characters.',
      });
    }

    let user = await User.findOne({ email }).select(
      '+emailVerificationOtpHash +emailVerificationOtpExpires'
    );

    if (user?.emailVerified === true) {
      return res.status(409).json({
        message: 'An account with this email already exists. Please sign in.',
      });
    }

    if (user) {
      user.name = name;
      user.college = college;
      user.password = password;
    } else {
      user = new User({
        name,
        email,
        password,
        college,
        emailVerified: false,
      });
    }

    const { emailed } = await sendVerificationCode(user);

    // If email failed, user is auto-verified — return token so they can go straight to dashboard
    if (!emailed) {
      return res.status(201).json({
        ...safeUser(user),
        token: generateToken(user._id),
        message: 'Account created. Email delivery is temporarily unavailable — you are signed in.',
      });
    }

    // Email sent successfully — user needs to verify with OTP
    return res.status(201).json({
      message: 'Verification code submitted. Check Inbox, Spam, and All Mail.',
      email: user.email,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'An account with this email already exists. Please sign in or resend verification.',
      });
    }

    console.error('[AUTH] Registration failed:', error.message);
    return res.status(500).json({
      message: 'Registration failed. Please try again.',
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const otp = String(req.body.otp || '').trim();

    if (!validEmail(email) || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        message: 'Enter a valid email and the 6-digit code.',
      });
    }

    const user = await User.findOne({ email }).select(
      '+emailVerificationOtpHash +emailVerificationOtpExpires'
    );

    if (!user) {
      return res.status(400).json({
        message: 'No account was found for this email. Please register first.',
      });
    }

    if (user.emailVerified === true) {
      return res.status(200).json({
        message: 'Email already verified. You can sign in.',
      });
    }

    if (!user.emailVerificationOtpHash || !user.emailVerificationOtpExpires) {
      return res.status(400).json({
        message: 'No active code exists. Request a new verification code.',
      });
    }

    if (user.emailVerificationOtpExpires.getTime() < Date.now()) {
      user.emailVerificationOtpHash = undefined;
      user.emailVerificationOtpExpires = undefined;
      await user.save();

      return res.status(400).json({
        message: 'That code has expired. Request a new one.',
      });
    }

    const stored = Buffer.from(user.emailVerificationOtpHash, 'hex');
    const submitted = Buffer.from(hashOtp(otp), 'hex');

    if (
      stored.length !== submitted.length ||
      !crypto.timingSafeEqual(stored, submitted)
    ) {
      return res.status(400).json({
        message: 'Incorrect verification code. Check the latest email and try again.',
      });
    }

    user.emailVerified = true;
    user.emailVerificationOtpHash = undefined;
    user.emailVerificationOtpExpires = undefined;
    await user.save();

    return res.json({
      message: 'Email verified successfully. You can now sign in.',
    });
  } catch (error) {
    console.error('[AUTH] Email verification failed:', error.message);
    return res.status(500).json({
      message: 'Could not verify your email. Please try again.',
    });
  }
};

exports.resendVerification = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);

    if (!validEmail(email)) {
      return res.status(400).json({
        message: 'Enter a valid email address.',
      });
    }

    const user = await User.findOne({ email }).select(
      '+emailVerificationOtpHash +emailVerificationOtpExpires'
    );

    if (!user) {
      return res.status(404).json({
        message: 'No account was found for this email. Register first using this address.',
      });
    }

    if (user.emailVerified === true) {
      return res.status(409).json({
        message: 'This email is already verified. Please sign in.',
      });
    }

    const { emailed } = await sendVerificationCode(user);

    if (!emailed) {
      return res.json({
        message: 'Email service unavailable — your account has been auto-verified. You can sign in now.',
      });
    }

    return res.json({
      message: 'Verification email submitted. Check Inbox, Spam, and All Mail.',
    });
  } catch (error) {
    console.error('[AUTH] Resend verification failed:', error.message);
    return res.status(500).json({
      message: 'Could not resend the verification email. Please try again.',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = req.body.password;

    if (!validEmail(email) || typeof password !== 'string' || !password) {
      return res.status(400).json({
        message: 'Enter your email and password.',
      });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    // DEMO FALLBACK: allow login even if email not verified
    // (for hackathon demo — remove in production)
    if (user.emailVerified !== true) {
      console.warn(`[AUTH] Login allowed for unverified user: ${user.email} (demo mode)`);
      // Don't block — allow them in
    }

    return res.json({
      ...safeUser(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('[AUTH] Login failed:', error.message);
    return res.status(500).json({
      message: 'Login failed. Please try again.',
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);

    if (!validEmail(email)) {
      return res.status(400).json({
        message: 'Enter a valid email address.',
      });
    }

    const user = await User.findOne({ email }).select(
      '+passwordResetOtpHash +passwordResetOtpExpires'
    );

    if (!user) {
      return res.json({
        message: 'If an account exists for that email, a reset code will be sent.',
      });
    }

    const otp = createOtp();
    user.passwordResetOtpHash = hashOtp(otp);
    user.passwordResetOtpExpires = expiryDate();
    await user.save();

    try {
      await sendOtpEmail({
        to: user.email,
        otp,
        purpose: 'password-reset',
      });
    } catch (error) {
      user.passwordResetOtpHash = undefined;
      user.passwordResetOtpExpires = undefined;
      await user.save().catch(() => {});

      console.error(
        '[AUTH] Password-reset email failed:',
        error.code || '',
        error.message
      );

      return res.status(503).json({
        message: error.code === 'EMAIL_NOT_CONFIGURED'
          ? 'Email service is not configured. Check EMAIL_USER and EMAIL_PASS in backend/.env.'
          : 'Could not send the reset email. Check the backend terminal for the [EMAIL] error.',
      });
    }

    return res.json({
      message: 'If an account exists for that email, a reset code will be sent.',
    });
  } catch (error) {
    console.error('[AUTH] Forgot password failed:', error.message);
    return res.status(500).json({
      message: 'Could not request a reset code. Please try again.',
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const otp = String(req.body.otp || '').trim();
    const password = req.body.password;

    if (
      !validEmail(email) ||
      !/^\d{6}$/.test(otp) ||
      typeof password !== 'string' ||
      password.length < 8
    ) {
      return res.status(400).json({
        message: 'Enter a valid email, six-digit reset code, and password with at least 8 characters.',
      });
    }

    const user = await User.findOne({ email }).select(
      '+passwordResetOtpHash +passwordResetOtpExpires'
    );

    if (!user || !user.passwordResetOtpHash || !user.passwordResetOtpExpires) {
      return res.status(400).json({
        message: 'Invalid or expired reset code. Request a new one.',
      });
    }

    if (user.passwordResetOtpExpires.getTime() < Date.now()) {
      user.passwordResetOtpHash = undefined;
      user.passwordResetOtpExpires = undefined;
      await user.save();

      return res.status(400).json({
        message: 'That reset code has expired. Request a new one.',
      });
    }

    const stored = Buffer.from(user.passwordResetOtpHash, 'hex');
    const submitted = Buffer.from(hashOtp(otp), 'hex');

    if (
      stored.length !== submitted.length ||
      !crypto.timingSafeEqual(stored, submitted)
    ) {
      return res.status(400).json({
        message: 'Incorrect reset code. Check the latest email and try again.',
      });
    }

    user.password = password;
    user.passwordResetOtpHash = undefined;
    user.passwordResetOtpExpires = undefined;
    await user.save();

    return res.json({
      message: 'Password reset successfully. You can now sign in.',
    });
  } catch (error) {
    console.error('[AUTH] Reset password failed:', error.message);
    return res.status(500).json({
      message: 'Could not reset the password. Please try again.',
    });
  }
};

exports.getMe = async (req, res) => res.json(safeUser(req.user));