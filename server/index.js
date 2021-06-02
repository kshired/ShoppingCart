require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');

const server = express();
const port = process.env.PORT;

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'));
} else {
  server.use(morgan('tiny'));
}

server.use('/', router);

server.use((_, res) => {
  res.status(404).send({
    ok: false,
    message: 'Unable to find the requested resource.',
  });
});

server.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
