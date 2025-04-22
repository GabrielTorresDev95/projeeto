//auth.cjs
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'SEU_SEGREDO_SEGURO';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token ausente.' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};
