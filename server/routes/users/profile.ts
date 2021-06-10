import client from '../../client';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

const seeProfile = async (req: Request, res: Response) => {
  const { id } = req;
  const user = await client.users.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  if (user) {
    const { username, city, zipcode, street } = user;
    res.status(200).send({
      ok: true,
      data: {
        username,
        city,
        zipcode,
        street,
      },
    });
    return;
  }
  res.status(401).send({
    ok: false,
    message: 'user not exist',
  });
};

const modifyProfile = async (req: Request, res: Response) => {
  const { id } = req;
  const { city, zipcode, street, password } = req.body;
  let newPassword: string = null;
  if (password) {
    newPassword = await bcrypt.hash(password, 10);
  }

  const updatedUser = await client.users.update({
    where: {
      id: parseInt(id),
    },
    data: {
      city,
      zipcode,
      street,
      ...(newPassword && { password: newPassword }),
    },
  });

  if (updatedUser.id) {
    const { username, city, zipcode, street } = updatedUser;
    res.status(200).send({
      ok: true,
      data: {
        username,
        city,
        zipcode,
        street,
      },
    });
  } else {
    res.status(401).send({
      ok: false,
      error: 'Could not update profile',
    });
  }
};

export { seeProfile, modifyProfile };
