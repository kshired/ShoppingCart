const express = require('express');
const authJwt = require('../../utils/auth');
const addDelivery = require('./addDelivery');
const getDelivery = require('./getDelivery');
const changeDeliveryStatus = require('./changeDeliveryStatus');

const router = express.Router();

router.post('/', authJwt, addDelivery);
router.get('/:id', authJwt, getDelivery);
router.patch('/', authJwt, changeDeliveryStatus);

module.exports = router;
