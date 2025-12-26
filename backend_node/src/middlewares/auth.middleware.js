const { verifyToken } = require('../utils/jwt');
const AppDataSource = require('../config/data-source');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: 'Authorization required' });

    const token = authHeader.split(' ')[1];
    const { userId } = verifyToken(token);

    const user = await AppDataSource.getRepository('User').findOneBy({ id: userId });
    if (!user) return res.status(401).json({ message: 'Invalid token' });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
