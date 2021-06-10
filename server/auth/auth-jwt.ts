import * as jwt from 'jsonwebtoken';
import { redisClient } from '../utils/cache';
import { promisify } from 'util';
const secret = process.env.SECRET;

export default {
  sign: (user: User): string => {
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
  verify: (token: string) => {
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
  refreshVerify: async (token: string, username: string) => {
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
