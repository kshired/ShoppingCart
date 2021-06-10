import path from 'path';
import dotenv from 'dotenv';
import * as express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development'
  ),
});

class App {
  public application: express.Application;

  constructor() {
    this.application = express();
    this.application.use(express.urlencoded({ extended: false }));
    this.application.use(express.json());
    this.application.use(cors());
    this.application.use(morgan('dev'));
    this.application.use(router);
  }
}

const server = new App().application;
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});
