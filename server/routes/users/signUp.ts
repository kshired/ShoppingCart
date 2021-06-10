import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import client from '../../client';
import jwt from '../../auth/auth-jwt';

const signUp = async (req: Request, res: Response) => {
  const { username, city, zipcode, street, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user: User = await client.users.create({
      data: {
        username,
        city,
        zipcode,
        street,
        password: hashedPassword,
      },
    });
    const token = jwt.sign(user);

    res.status(200).send({
      ok: true,
      data: {
        token,
      },
    });
  } catch (err) {
    res.status(409).send({
      ok: false,
      message: err.message,
    });
  }
};

export default signUp;
