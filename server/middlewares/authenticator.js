const jwt = require('jsonwebtoken');
const { SECRET } = require('../config').get(process.env.NODE_ENV);

const authenticate = (req, res, next) => {
  const { token } = req.cookies;
  console.log('in authenticate');
  console.log(token);
  if (!token) {
    return res.status(403).json({ error: 'User is not authenticated' });
  }
  try {
    const { userId } = jwt.verify(token, SECRET);
    req.userId = userId;
    return next();
  } catch (err) {
    return res.status(403).json({ error: 'User is not authenticated' });
  }
};

module.exports = authenticate;
