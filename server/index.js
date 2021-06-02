require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const cartRouter = require('./routes/cartItem');
const deliveryRouter = require('./routes/delivery');

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
server.use('/items', itemsRouter);
server.use('/cart', cartRouter);
server.use('/delivery', deliveryRouter);

server.use((_, res) => {
  res.status(404).send({
    ok: false,
    message: 'Unable to find the requested resource.',
  });
});

server.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
