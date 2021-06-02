const express = require('express');
const addItem = require('./addItem');
const getOneItem = require('./getOneItem');
const { getItemList, getItemCount } = require('./getItemList');
const deleteItem = require('./deleteItem');
const editItem = require('./editItem');

const router = express.Router();

router.post('/', addItem);
router.get('/pagination', getItemCount);
router.get('/:id', getOneItem);
router.delete('/:id', deleteItem);
router.patch('/:id', editItem);
router.get('/', getItemList);

module.exports = router;
