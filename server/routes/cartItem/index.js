const express = require('express');
const authJwt = require('../../utils/auth');
const addCartItem = require('./addCartItem');
const deleteCartItem = require('./deleteCartItem');
const getCartItems = require('./getCartItems');

const router = express.Router();

router.get('/', authJwt, getCartItems);
router.post('/', authJwt, addCartItem);
router.delete('/', authJwt, deleteCartItem);

module.exports = router;
