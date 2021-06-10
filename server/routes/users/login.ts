import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import client from '../../client';
import { redisClient } from '../../utils/cache';

const login = async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    req.body;

  const user = await client.users.findFirst({
    where: {
      username,
    },
  });

  if (user) {
    const chk: boolean = await bcrypt.compare(password, user.password);
    if (chk) {
      const accessToken = 'token';
      const refreshToken = 'refresh';
      redisClient.set(username, refreshToken);

      res.status(200).send({
        ok: true,
        data: {
          accessToken,
          refreshToken,
        },
      });

      return;
    } else {
      res.status(401).send({
        ok: false,
        message: 'password is incorrect',
      });
      return;
    }
  }
  res.status(401).send({
    ok: false,
    message: 'user not exist',
  });
};

export default login;
