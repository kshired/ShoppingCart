const jwt = require('jsonwebtoken');
const users = require('../models/users');

const secret = process.env.SECRET;

module.exports = {
  sign: (user) => {
    const payload = {
      name: user.name,
    };

    return jwt.sign(payload, secret, {
      algorithm: 'HS256',
      expiresIn: '30m',
      issuer: 'kshired',
    });
  },
  verify: (token) => {
    let decoded = null;
    try {
      decoded = jwt.verify(token, secret);
      return `verified ${decoded.name}`;
    } catch (err) {
      if (err.message === 'jwt expired') {
        return 'expired token';
      } else if (err.message === 'invalid token') {
        return 'invalid token';
      } else {
        return 'invalid token';
      }
    }
  },
};
