const jwt = require('jsonwebtoken');
const { SECRET } = require('../config').get(process.env.NODE_ENV);

const authenticate = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.redirect('/login');
  }
  try {
    const { userId } = jwt.verify(token, SECRET);
    req.userId = userId;
    return next();
  } catch (err) {
    return res.redirect('/login');
  }
};

module.exports = authenticate;
