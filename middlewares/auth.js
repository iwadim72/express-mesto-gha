const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');

const handleAuthError = (res, req, next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  // Линтер требует сделать return, хотя он тут не нужен, буду благодарен за помощь :)
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res, req, next);
  }

  req.user = payload;

  next();
};
