require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const usersRouter = require('./routes/users');

const server = express();
const port = process.env.PORT;

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'));
} else {
  server.use(morgan('tiny'));
}

server.use('/users', usersRouter);

server.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
