const express = require('express');
const addItem = require('./addItem');
const getOneItem = require('./getOneItem');
const getItemList = require('./getItemList');

const router = express.Router();

router.post('/add', addItem);
router.get('/:id', getOneItem);
router.get('/', getItemList);
module.exports = router;
