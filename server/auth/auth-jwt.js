const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

module.exports = {
  sign: (user) => {
    const payload = {
      id: user.id,
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
      return `verified ${decoded.id}`;
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
