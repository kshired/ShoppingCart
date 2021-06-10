import client from '../../client';
import auth from '../../auth/auth-jwt';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const refresh = async (req: Request, res: Response) => {
  if (req.headers.authorization && req.headers.refresh) {
    const authToken = req.headers.authorization.split('Bearer ')[1];
    const originalRefreshToken = req.headers.refresh;

    let refreshToken = null;
    if (typeof originalRefreshToken === 'object') {
      refreshToken = originalRefreshToken.join('');
    } else {
      refreshToken = originalRefreshToken;
    }

    const authResult = auth.verify(authToken);
    const decoded: any = jwt.decode(authToken);

    if (decoded === null) {
      res.status(401).send({
        ok: false,
        message: 'Not authorized',
      });
    }

    let user = null;
    try {
      user = await client.users.findFirst({
        where: {
          id: decoded.id,
        },
      });
    } catch (err) {
      res.status(401).send({
        ok: false,
        message: err.message,
      });
    }

    const refreshResult = await auth.refreshVerify(refreshToken, user.username);

    if (authResult.ok === false && authResult.message === 'jwt expired') {
      // 1. accessToken expired && refreshToken expired => make user login
      if (refreshResult.ok === false) {
        res.status(401).send({
          ok: false,
          message: 'No authorized!',
        });
      } else {
        // 2. accessToken expired && refreshToken valid => make new accessToken
        const newAccessToken = auth.sign(user);

        res.status(200).send({
          ok: true,
          data: {
            accessToken: newAccessToken,
            refreshToken,
          },
        });
      }
    } else {
      // 3. accessToken valid => dont have to make new token
      res.status(400).send({
        ok: false,
        message: 'Acess token is not expired!',
      });
    }
  } else {
    res.status(400).send({
      ok: false,
      message: 'Access token and refresh token are need for refresh!',
    });
  }
};

export default refresh;
