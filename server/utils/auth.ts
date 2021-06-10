import auth from '../auth/auth-jwt';
import { Request, Response, NextFunction } from 'express';

const authJWT = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = auth.verify(token);
    if (result.ok) {
      req.id = result.id;
      req.role = result.role;
      next();
    } else {
      res.status(401).send({
        ok: false,
        message: result.message,
      });
    }
  }
};

export default authJWT;
