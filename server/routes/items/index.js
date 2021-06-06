const express = require('express');
const addItem = require('./addItem');
const getOneItem = require('./getOneItem');
const { getItemList, getItemCount } = require('./getItemList');
const deleteItem = require('./deleteItem');
const editItem = require('./editItem');
const authJWT = require('../../utils/auth');
const { get } = require('../../utils/cache');

const router = express.Router();

router.post('/', authJWT, addItem);
router.get('/page', getItemCount);
router.get('/', get, getItemList);
router.get('/:id', getOneItem);
router.delete('/:id', authJWT, deleteItem);
router.patch('/:id', authJWT, editItem);

module.exports = router;
