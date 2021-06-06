const express = require('express');
const usersRouter = require('./users');
const itemsRouter = require('./items');
const cartRouter = require('./cartItem');
const deliveryRouter = require('./delivery');
const ordersRouter = require('./orders');
const { uploadToS3, uploadImage } = require('../utils/upload');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/items', itemsRouter);
router.use('/cart', cartRouter);
router.use('/delivery', deliveryRouter);
router.use('/orders', ordersRouter);
router.post('/upload', uploadToS3.single('image'), uploadImage);

module.exports = router;
