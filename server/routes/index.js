const express = require('express');
const usersRouter = require('./users');
const itemsRouter = require('./items');
const cartRouter = require('./cartItem');
const deliveryRouter = require('./delivery');
const ordersRouter = require('./orders');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/items', itemsRouter);
router.use('/cart', cartRouter);
router.use('/delivery', deliveryRouter);
router.use('/orders', ordersRouter);

module.exports = router;
