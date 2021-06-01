const jwt = require('jsonwebtoken');
const users = require('../models/users');

const secret = process.env.SECRET;

module.exports = {
  sign: async (user) => {
    const payload = {
      name: user.name,
    };

    return jwt.sign(payload, secret, {
      algorithm: 'HS256',
      expiresIn: '30m',
      issuer: 'kshired',
    });
  },
  verify: async (token) => {
    let decoded = null;
    try {
      decoded = jwt.verify(token, secret);
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
