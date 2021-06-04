require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const router = require('./routes');
const setSocket = require('./chat/socket');

const server = express();
const compoundedServer = http.createServer(server);
const port = process.env.PORT;

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'));
  process.env.DATABASE_URL = process.env.DATABASE_URL_DEV;
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

const io = socketIO(compoundedServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

setSocket(io);

compoundedServer.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
