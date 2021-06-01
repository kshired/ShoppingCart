const express = require('express');
const signUp = require('./signUp');
const login = require('./login');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

module.exports = router;
