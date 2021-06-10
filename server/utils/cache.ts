import * as redis from 'redis';
import { Request, Response, NextFunction } from 'express';

const redisClient = redis.createClient(process.env.REDIS_PORT);

const set = (key: string, value: any) => {
  redisClient.set(key, JSON.stringify(value));
};

const get = (req: Request, res: Response, next: NextFunction) => {
  const key: string = req.originalUrl;
  redisClient.get(key, (error, data) => {
    if (error) {
      res.status(400).send({
        ok: false,
        message: error,
      });
    }
    if (data) {
      res.status(200).send({
        ok: true,
        data: JSON.parse(data),
      });
    } else {
      next();
    }
  });
};

export { redisClient, set, get };
