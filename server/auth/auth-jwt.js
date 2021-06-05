const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

module.exports = {
  sign: (user) => {
    const payload = {
      id: user.id,
      role: user.role,
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
      return {
        ok: true,
        id: decoded.id,
        role: decoded.role,
      };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
};
