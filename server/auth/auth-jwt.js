const jwt = require('jsonwebtoken');
const { redisClient } = require('../utils/cache');
const { promisify } = require('util');
const secret = process.env.SECRET;

module.exports = {
  sign: (user) => {
    const payload = {
      id: user.id,
      role: user.role,
    };

    return jwt.sign(payload, secret, {
      algorithm: 'HS256',
      expiresIn: '1h',
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
  refresh: () => {
    return jwt.sign({}, secret, {
      algorithm: 'HS256',
      expiresIn: '14d',
      issuer: 'kshired',
    });
  },
  refreshVerify: async (token, username) => {
    const getAsync = promisify(redisClient.get).bind(redisClient);
    try {
      const data = await getAsync(username);
      if (token === data) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
        };
      }
    } catch (err) {
      return {
        ok: false,
      };
    }
  },
};
