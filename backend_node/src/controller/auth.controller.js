const bcrypt = require('bcrypt');
const AppDataSource = require('../config/data-source');
const { signToken, verifyToken } = require('../utils/jwt');
const { sendEmail } = require('../utils/email');

const UserRepo = () => AppDataSource.getRepository('User');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  const existingUser = await UserRepo().findOne({ where: { email } });
  if (existingUser)
    return res.status(409).json({ message: 'Email already registered' });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = UserRepo().create({
    firstName,
    lastName,
    email,
    passwordHash,
  });

  await UserRepo().save(user);

  const verifyToken = signToken({ userId: user.id }, '24h');

  const verifyLink = `http://localhost:5000/api/auth/verify-email?token=${verifyToken}`;

  await sendEmail({
    to: email,
    subject: 'Verify your email',
    html: `<p>Click to verify:</p><a href="${verifyLink}">${verifyLink}</a>`,
  });

  res.json({ message: 'Registration successful. Please verify email.' });
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const { userId } = verifyToken(token);

    await UserRepo().update(userId, { isEmailVerified: true });

    res.json({ message: 'Email verified successfully' });
  } catch {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserRepo().findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  if (!user.isEmailVerified)
    return res.status(403).json({ message: 'Email not verified' });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch)
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken({ userId: user.id }, '1d');

  res.json({ token });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await UserRepo().findOne({ where: { email } });
  if (!user) return res.json({ message: 'If email exists, reset link sent' });

  const resetToken = signToken({ userId: user.id }, '15m');

  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

  await sendEmail({
    to: email,
    subject: 'Reset password',
    html: `<a href="${resetLink}">Reset Password</a>`,
  });

  res.json({ message: 'Password reset link sent' });
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const { userId } = verifyToken(token);

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await UserRepo().update(userId, { passwordHash });

    res.json({ message: 'Password updated successfully' });
  } catch {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};
