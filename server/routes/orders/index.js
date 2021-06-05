const express = require('express');
const authJwt = require('../../middlewares/auth');
const addOrder = require('./addOrder');
const { getOrdersList, getPages } = require('./getOrders');
const getOrderItems = require('./getOrderItems');
const cancelOrder = require('./cancelOrder');

const router = express.Router();

router.post('/', authJwt, addOrder);
router.get('/page', authJwt, getPages);
router.get('/', authJwt, getOrdersList);
router.get('/:id', authJwt, getOrderItems);
router.delete('/:id', authJwt, cancelOrder);

module.exports = router;
